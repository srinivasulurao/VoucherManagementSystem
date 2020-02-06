import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { VmsApiService } from '../vms-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { emailValidate } from '../app.validators';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})


export class MyProfileComponent implements OnInit {

  public CurrencyList:any;
  public user_details:any;
  public plans:any;
  public alertClass:any;
  public alertMessage:any;
  public company_logo:any;
  public button_text:any;
  public company_logo_temp:any;
  public button_disabled=false;
  public account_created:any;
  public last_login:any;
  public account_status:any;
  public account_status_badge:any; 
  public account_validity:any; 

  public CompanyNameControl=new FormControl('',[Validators.required]);
  public PlanControl=new FormControl('',[Validators.required]); 
  public CurrencyControl=new FormControl('',[Validators.required]); 
  public PayPalEmailControl=new FormControl('', [Validators.required, emailValidate]); 
  public CompanyEmailControl=new FormControl({disabled:'true'},[Validators.required, emailValidate]); //Finally we have implemented a custom validator.
  
  constructor(public vms_api:VmsApiService, public route:Router) { 

    this.CurrencyList=["USD","INR","GBP","EUR", "AUD","CAD","SGD"]; 
    this.button_text="Submit"; 
  }
 
  ngOnInit() {

    //Load All Plans
    this.vms_api.getAllPlans().subscribe(data=>{
    var result=JSON.parse(JSON.stringify(data));
    if(result.http_response_code==200){
      this.plans=result.data;
    }
    else{
      this.alertClass="alert alert-danger";
      this.alertMessage=result.verbose_message;
    }
    },
    error=>{
    console.log(error);
    });


    //load User Details.
    var user_id=localStorage.getItem('user_id'); 
    this.vms_api.getUserDetails(user_id).subscribe(data=>{
      var result=JSON.parse(JSON.stringify(data));
      if(result.http_response_code==200){
        console.log(result); 
        this.CompanyNameControl.setValue(result.data.company_name); 
        this.CompanyEmailControl.setValue(result.data.email);
        this.CurrencyControl.setValue(result.data.currency); 
        this.PlanControl.setValue("plan_"+result.data.opted_plan);
        this.PayPalEmailControl.setValue(result.data.paypal_email); 
        this.company_logo=this.vms_api.image_dir+"/company_logos/"+result.data.company_logo;
        this.account_created=result.data.account_created;
        this.last_login=result.data.last_login; 
        this.account_status=(result.data.activation==1)?"Active":"Suspended";
        this.account_status_badge=(result.data.activation==1)?"badge badge-success":"badge badge-danger"; 
        
        //check the plan validity.
        let params=JSON.parse(result.data.params); 
        let last_plan=(params.length-1);
        
        for(var i=0; i<params.length;i++){
           if(params[i].plan_slno==last_plan){
              this.account_validity=params[i].end_date;
              break;
           } 
        }
      }
      else{
        this.alertClass="alert alert-danger";
        this.alertMessage=result.verbose_message;
       }
        
    },
    
    error=>{
      console.log(error); 
    });
    
  }

  CompanyImageUpload(event){
    this.company_logo_temp=event.target.files[0]; //this value will be set, if anyone changes the logo field value.
  }


  resetButton(){
    this.button_disabled=false;
    this.button_text="Submit";
  }


  SaveProfileDetails(){
    this.button_text="Please Wait ...";
    this.button_disabled=true;
    var user_id=localStorage.getItem('user_id'); 
     this.vms_api.SaveCompanyProfileDetails(user_id, this.CompanyNameControl.value, this.CompanyEmailControl.value, this.PayPalEmailControl.value, this.CurrencyControl.value, this.PlanControl.value, this.company_logo_temp)
     .subscribe(data=>{
        let request=JSON.parse(JSON.stringify(data));
        if(request.http_response_code==200){
          this.alertMessage=request.verbose_message;
          this.alertClass=["alert","alert-success"];
        }
        else{
          this.alertMessage=request.verbose_message;
          this.alertClass=["alert","alert-danger"]; 
        }
        this.resetButton();
     },
     error=>{
      console.log(error); 
      this.alertMessage=error.message;
      this.alertClass="alert alert-danger"; 
      this.resetButton();
     });
  }


  

} // Class Ends here.
