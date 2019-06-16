import { Component, OnInit, ViewChild } from '@angular/core';
import { VmsApiService } from '../vms-api.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material'; 
import { DeleteWarningComponent } from '../delete-warning/delete-warning.component';
import { VoucherDetailsComponent } from '../voucher-details/voucher-details.component'; 
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material'; 
import { SampleVoucherFileComponent } from '../sample-voucher-file/sample-voucher-file.component';
import { UploadVoucherComponent } from '../upload-voucher/upload-voucher.component'; 


export interface VoucherList {
  voucher_id: string;
  coupon_code: string;
  validity:string;
  enabled: string;
  redemption_status: string;
}



@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.css']
})



export class VouchersComponent implements OnInit {

  vouchers:any;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any>=new Subject();
  public alertMessage:any;
  public alertClass:any;
  public redeemed:any;
  public not_redeemed:any;
  displayedColumns: string[] = ['Voucher ID', 'Coupon Code', 'Voucher Validity', 'Enabled','Redemption Status','View','Delete'];
  dataSource: MatTableDataSource<VoucherList>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private vms_api:VmsApiService, private router:Router, private dialog:MatDialog) { 

    this.redeemed="Redeemed";
    this.not_redeemed="Not Redeemed"; 
  }

  //Just copy paste the function from the documentation site.
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {

    

    var user_id=localStorage.getItem('user_id'); 
    //load the webservice to get the user vouchers.
    this.vms_api.getUserVouchers(user_id).subscribe(data=>{
      var response=JSON.parse(JSON.stringify(data));
      if(response.http_response_code==200){
        this.vouchers=response.data;
        this.dataSource=new MatTableDataSource(this.vouchers); 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else{
        this.alertClass="alert alert-danger";
        this.alertMessage=response.verbose_message;
      }
    },
    error=>{
        this.alertClass="alert alert-danger";
        this.alertMessage="Error: "+error.message;
    }
    );
  }

  deleteVoucher(voucher_id){
    //Show a warning dialog.
    let dialog=this.dialog.open(DeleteWarningComponent,{
      height: '200px',width: '600px',autoFocus: false
    }); 

    dialog.afterClosed()
      .subscribe(selection => {
        console.log(selection); 
        if(selection==true){
          this.callDeleteWebservice(voucher_id);
        }
      });
  }

  callDeleteWebservice(voucher_id){
    var user_id=localStorage.getItem('user_id'); 
    this.vms_api.deleteVoucher(voucher_id,user_id).subscribe(data=>{
       var response=JSON.parse(JSON.stringify(data));
       if(response.http_response_code==200){
        this.vouchers=response.data; 
        this.dataSource=new MatTableDataSource(this.vouchers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.alertClass="alert alert-success";
        this.alertMessage=response.verbose_message;
      }
      else{
        this.alertClass="alert alert-danger";
        this.alertMessage=response.verbose_message;
      }
    },
    error=>{
      this.alertClass="alert alert-danger";
      this.alertMessage="Error: "+error.message;
    });
  }

  changeVoucherRedemption(voucher_id,status){
    var user_id=localStorage.getItem('user_id'); 
    this.vms_api.changeRedemptionStatus(voucher_id,user_id,status).subscribe(data=>{
       var response=JSON.parse(JSON.stringify(data));
       if(response.http_response_code==200){
        this.vouchers=response.data; 
        this.dataSource=new MatTableDataSource(this.vouchers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.alertClass="alert alert-success";
        this.alertMessage=response.verbose_message;
      }
      else{
        this.alertClass="alert alert-danger";
        this.alertMessage=response.verbose_message;
      }
    },
    error=>{
      this.alertClass="alert alert-danger";
      this.alertMessage="Error: "+error.message;
    });
  }
 
  viewEditVoucherDetails(voucher_id){
    let voucherdialog=this.dialog.open(VoucherDetailsComponent,{
      height: '650px',width: '600px',autoFocus: false,data:{'voucher_id':voucher_id}
    });   

    voucherdialog.afterClosed()
      .subscribe(selection => {
        console.log(selection); 
        
      });
  }

  downloadSampleCSVFile(){
    let sampleCSVdialog=this.dialog.open(SampleVoucherFileComponent,{
      height: '680px',width: '700px',autoFocus: false
    });   

    sampleCSVdialog.afterClosed()
      .subscribe(selection => {
        console.log(selection); 
        
      });

    //window.open(this.vms_api.webservice.toString().split("api").join("")+'storage/sample_voucher_upload.csv');   
  }

  disableEnableVoucher(voucher_id,status){
    

    var user_id=localStorage.getItem('user_id'); 
    this.vms_api.disableEnableVoucher(voucher_id,user_id,status).subscribe(data=>{
       var response=JSON.parse(JSON.stringify(data));
       if(response.http_response_code==200){
        this.vouchers=response.data; 
        this.dataSource=new MatTableDataSource(this.vouchers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.alertClass="alert alert-success";
        this.alertMessage=response.verbose_message;
      }
      else{
        this.alertClass="alert alert-danger";
        this.alertMessage=response.verbose_message;
      }
    },
    error=>{
      this.alertClass="alert alert-danger";
      this.alertMessage="Error: "+error.message;
    });

  }

  uploadVouchers(){

    let dialog=this.dialog.open(UploadVoucherComponent,{
      height: '300px',width: '600px',autoFocus: false
    }); 

    // dialog.afterClosed()
    //   .subscribe(selection => {
    //     console.log(selection); 
    //     if(selection==true){
    //       alert("hello"); 
    //     }
    //   });
  }


 
} //Class ends here.
