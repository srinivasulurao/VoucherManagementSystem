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

  public CompanyNameControl=new FormControl('',[Validators.required]);
  public PlanControl=new FormControl('',[Validators.required]); 
  public CurrencyControl=new FormControl('',[Validators.required]); 
  public CompanyEmailControl=new FormControl({disabled:'true'},[Validators.required, emailValidate]); //Finally we have implemented a custom validator.
  
  constructor(public vms_api:VmsApiService, public route:Router) { 

    this.CurrencyList=["USD","INR","GBP","EUR", "AUD","CAD","SGD"]; 
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
        this.CompanyNameControl.setValue(result.data.company_name); 
        this.CompanyEmailControl.setValue(result.data.email);
        this.CurrencyControl.setValue(result.data.currency); 
        this.PlanControl.setValue("plan_"+result.data.opted_plan);
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


  saveProfileDetails(){

  }


  

} // Class Ends here.
