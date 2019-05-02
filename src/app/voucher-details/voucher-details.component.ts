import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, ErrorStateMatcher } from '@angular/material';
import { VmsApiService } from '../vms-api.service';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { EventListener } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'app-voucher-details',
  templateUrl: './voucher-details.component.html',
  styleUrls: ['./voucher-details.component.css']
})
 

export class VoucherDetailsComponent implements OnInit {

  public voucher_id:any;
  public voucher_data:any; 
  public product_list:any;
  public alertClass:any;
  public alertMsg:any;
  public loading_val:any;
  public showProgress:boolean;
  public loadingFunction:any;
  public voucherValidityControl=new FormControl('',[Validators.required]);
  public notesControl=new FormControl(); 
  public productLinkedControl=new FormControl('',[Validators.required]); 
  public redemptionStatusControl=new FormControl('',[Validators.required]);
  public enabledControl=new FormControl('',[Validators.required]);
  public redeemedOnControl=new FormControl();
  public createdOnControl=new FormControl('',[Validators.required]);  



  constructor(@Inject (MAT_DIALOG_DATA) data, private vms_api:VmsApiService) { 

    this.voucher_id=data.voucher_id; 
    this.getCompanyProductList(); 
    this.loadVoucherDetails(this.voucher_id); 
    
    this.loading_val=0;
    this.loadingFunction=setInterval(()=>this.setLoader(),400);  
    this.showProgress=true; 
  }

  setLoader(){
      this.loading_val=parseInt(this.loading_val)+2;
      if(this.loading_val==90){ 
        clearInterval(this.loadingFunction); 
      }
      //console.log(this.loading_val); 
 }

  getCompanyProductList(){
    var user_id=localStorage.getItem('user_id');
    this.vms_api.loadProductList(user_id).subscribe(data=>{
      let response=JSON.parse(JSON.stringify(data));
      //console.log(response); 
      if(response.http_response_code==200){
        this.product_list=response.data;
      }
      else{
        console.log(response); 
      }
    },
    error=>{
      console.log(error); 
    });
  }
 
  ngOnInit() {
    
  }

  SubmitVoucherDetails(){
    if(this.productLinkedControl.hasError('required') || this.voucherValidityControl.hasError('required') || this.productLinkedControl.hasError('required') || this.createdOnControl.hasError('required') || this.enabledControl.hasError('required') || this.redemptionStatusControl.hasError('required')){
       //Just don't do anything, let the user rectify his issues.
    }
    else{
    this.vms_api.updateVoucherDetails(localStorage.getItem('user_id'), this['voucher_id'], this.voucherValidityControl.value,this.productLinkedControl.value, this.redemptionStatusControl.value, this.enabledControl.value, this.createdOnControl.value, this.redeemedOnControl.value, this.notesControl.value).subscribe(data=>{
       var response=JSON.parse(JSON.stringify(data)); 
       this.getCompanyProductList(); 
       this.alertClass="alert alert-success";
       this.alertMsg="Voucher Details Saved Successfully !"; 
    },
    error=>{
     console.log(error); 
     this.alertClass="alert alert-danger"; 
     this.alertMsg=error.message;
    },);
  }
    
  }

  loadVoucherDetails(voucher_id){
    var user_id=localStorage.getItem('user_id'); 
    
    this.vms_api.loadVoucherData(voucher_id,user_id).subscribe(data=>{
      this.loading_val=50; 
     let response=JSON.parse(JSON.stringify(data));
     if(response.http_response_code==200){
       this.voucher_data=response.data;
       this['coupon_code']=response.data.coupon_code;  
       this['voucher_id']=response.data.voucher_id; 
       this.notesControl.setValue(response.data.notes);
       this.redemptionStatusControl.setValue((response.data.redemption_status==1)?"yes":"no");
       this.enabledControl.setValue((response.data.enabled==1)?"yes":"no"); 
       this.voucherValidityControl.setValue(new FormControl(new Date(new Date(response.data.validity).getTime())).value); 
       this.createdOnControl.setValue(new FormControl(new Date(new Date(response.data.created_on).getTime())).value);
       this.redeemedOnControl.setValue(new FormControl(new Date(new Date(response.data.redeemed_on).getTime())).value); 
       this.productLinkedControl.setValue("product_"+response.data.product_linked); 
     }
     else{
       console.log(response);   
     }

     this.loading_val=100;
      
    },
    
    error=>{
         console.log(error); 
    });
  }

}
