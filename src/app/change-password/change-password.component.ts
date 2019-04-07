import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { VmsApiService } from '../vms-api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public updatingPasswordFalse:boolean;
  public updatingPasswordTrue:boolean;
  public changePasswordButtonDisabled: boolean;
  public showAlertMessage:boolean;
  public alertClass:string;
  public alertMessage:string;

  constructor(private router:Router, private vms_api:VmsApiService) { 
  }

  ngOnInit() {

    this.updatingPasswordFalse=true;
    this.updatingPasswordTrue=false;
    this.changePasswordButtonDisabled=false; 
  }



  AttemptChangePassword(){
    //Don't show any error.
    this.alertHandler(false,"","");
    //First Validate the changes. 
    if(this.validateFields()==true){
      this.updatingPasswordTrue=true;
      this.updatingPasswordFalse=false;
      this.changePasswordButtonDisabled=true;
      //change password using the webservice.
      this.vms_api.changePassword(localStorage.getItem('user_id'),this['new_password']).subscribe(data=>{
        var response=JSON.parse(JSON.stringify(data));
        if(response.http_response_code==200){
          this.alertHandler(true,"alert alert-success",response.verbose_message);
          //also update the password.
          localStorage.setItem('password',response.data); //Update the password.
        }
        else{
            this.alertHandler(true,"alert alert-danger", response.verbose_message);
        }
        this.updatingPasswordTrue=false;
        this.updatingPasswordFalse=true;
        this.changePasswordButtonDisabled=false;
      },
      error=>{
        this.alertHandler(true,"alert alert-danger",error.message);
        this.updatingPasswordTrue=false;
        this.updatingPasswordFalse=true;
        this.changePasswordButtonDisabled=false;
      }
      );//Webservice call ends here.
    }

  }

  validateFields(){
    //Md5 encryption is working as expected.
    if(this['old_password']==undefined || this['new_password']==undefined || this['confirm_new_password']==undefined){
      this.alertHandler(true,"alert alert-danger","All the fields are mandatory !"); 
      return false; 
    }
    if(this['old_password']=="" || this['new_password']=="" || this['confirm_new_password']==""){
      this.alertHandler(true,"alert alert-danger","All the fields are mandatory !"); 
      return false; 
    }
    else if(String(this['old_password']).length < 8 || String(this['old_password']).length > 16){
     this.alertHandler(true,"alert alert-danger","Old password length should be between 8 to 16 characters");
     return false;
    }
    else if(String(this['new_password']).length < 8 || String(this['new_password']).length > 16){
      this.alertHandler(true,"alert alert-danger","New password length should be between 8 to 16 characters");
      return false;
    }
    else if(String(this['confirm_new_password']).length < 8 || String(this['confirm_new_password']).length > 16){
      this.alertHandler(true,"alert alert-danger","Confirm new password length should be between 8 to 16 characters");
      return false;
    }
    else if(this['new_password']!=this['confirm_new_password']){
      this.alertHandler(true,"alert alert-danger","Newly Entered Passwords are not Matching !");
      return false;
    }
    else if(Md5.hashStr(this['old_password'])!==localStorage.getItem('password')){
     this.alertHandler(true,"alert alert-danger","Incorrect Old Password !"); 
     return false;
    }
    else if(Md5.hashStr(this['new_password'])==localStorage.getItem('password')){
      this.alertHandler(true,"alert alert-danger","Same old password can't be updated !");
      return false;
    }
    else{
      return true;
    }
  }

  alertHandler(showAlertMessage,alertClass,alertMessage){
    this.showAlertMessage=showAlertMessage;
    this.alertClass=alertClass;
    this.alertMessage=alertMessage;
  }

  
}//Class ends here.
