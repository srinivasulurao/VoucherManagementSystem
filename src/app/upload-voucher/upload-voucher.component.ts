import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { VmsApiService } from '../vms-api.service';

@Component({
  selector: 'app-upload-voucher',
  templateUrl: './upload-voucher.component.html',
  styleUrls: ['./upload-voucher.component.css']
})
export class UploadVoucherComponent implements OnInit {

  public submitting_button_style:any;
  public upload_button_style:any; 
  public uploadCSVFileControl=new FormControl('',[Validators.required]); 
  public selectedFile:any;
  public alertClass:any;
  public alertMessage:any;

  constructor(public vms_api: VmsApiService) { 
    this.selectedFile=""; //No Files added.
    this.submitting_button_style={"display":"none"};  
    this.upload_button_style={"display":"block"}; 

  }

  ngOnInit() {
    
  }

  getFileExtension(file){
    var is_csv=file.indexOf(".csv");
    if(is_csv > -1)
      return "csv";
    else
      return "Some Other File Extension!";
  }

  processCSVFile(){
    
    //File is mandatory.
    if(this['csv_file']==null || this['csv_file']==undefined){
      this.alertClass="alert alert-danger";
      this.alertMessage="CSV file is mandatory";
       return false;
    }
    //File extension should be .csv only.
    if(this.getFileExtension(this['csv_file'])!=="csv"){
      this.alertClass="alert alert-danger";
      this.alertMessage="Only CSV File is allowed !";
       return false;
    }


    this.submitting_button_style={"display":"block"};  
    this.upload_button_style={"display":"none"}; 
    var user_id=localStorage.getItem('user_id'); 
    this.vms_api.uploadVoucherCSVFile(user_id,this.selectedFile).subscribe(data=>{
      this.submitting_button_style={"display":"none"};  
      this.upload_button_style={"display":"block"}; 
      var response=JSON.parse(JSON.stringify(data)); 
      if(response.http_response_code==200){
        this.alertClass="alert alert-success";
        this.alertMessage=response.verbose_message;
      }
      else if(response.http_response_code==201){
        this.alertClass="alert alert-info";
        this.alertMessage=response.verbose_message;
      }
      else{
        this.alertClass="alert alert-danger";
        this.alertMessage=response.verbose_message; 
      }
    },
    error=>{
          this.submitting_button_style={"display":"none"};  
          this.upload_button_style={"display":"block"}; 
          this.alertClass="alert alert-danger";
          this.alertMessage=error.message;
    });
  }

  onFileUpload(event){
    this.selectedFile= event.target.files[0];
    //console.log(this.selectedFile); 
 }

}
