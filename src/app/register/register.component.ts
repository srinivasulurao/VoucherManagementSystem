import { Component, OnInit } from '@angular/core';
import { VmsApiService } from '../vms-api.service';
import { FormControl, Validators } from '@angular/forms';
import { emailValidate } from '../app.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public plans:any;
  public plansArray:any;
  public CurrencyList:any; 
  public SubmitButtonStyle:any;
  public alertMessage:any;
  public alertClass:any; 
  public RegistrationSuccessful:any; 

  public CompanyNameControl=new FormControl('',[Validators.required]);
  public EmailControl=new FormControl('',[emailValidate,Validators.required]);  
  public PasswordControl=new FormControl('',[Validators.required]);
  public ConfirmPasswordControl=new FormControl('',[Validators.required]);
  public PlanControl=new FormControl('',[Validators.required,Validators.maxLength(10)]); 
  public CurrencyControl=new FormControl('',[Validators.required]); 
  public TermsConditionsControl=new FormControl('', Validators.required); 
  public PhoneControl=new FormControl('',[Validators.required]); 
  public CompanyLogo:any;

  public logo_error:any;
  public terms_error:any; 

  constructor(private vms_api:VmsApiService, private router:Router) {

    this.RegistrationSuccessful=false;

    this.CurrencyList=["USD","INR","GBP","EUR", "AUD","CAD","SGD"]; 
    this.SubmitButtonStyle={"display":"none"}; 

    //Debugging values.
    this.logo_error="";
    this.terms_error="";
    this.CompanyNameControl.setValue("NetApp Solutions");
    this.EmailControl.setValue("doru.arfire.1279@gmail.com");
    this.PasswordControl.setValue("ATG2dfPQ");
    this.ConfirmPasswordControl.setValue("ATG2dfPQ");
    this.PlanControl.setValue("1");
    this.CurrencyControl.setValue("USD"); 
    this.TermsConditionsControl.setValue("yes"); 
    this.PhoneControl.setValue("8792394035"); 
    
   }

   private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
  })
}

private termsConditionChange(event){
    if(event.checked==true){
      this.terms_error=false;
    }
    else{
      this.terms_error=true;
    }
}

ValidateAndEnablePaymentButton(){
    let error=null;
    if(this.CompanyLogo!=null && this.TermsConditionsControl.value=="yes" && this.CompanyNameControl.valid==true && this.PhoneControl.valid==true && this.PasswordControl.valid==true && this.EmailControl.valid==true && this.PlanControl.valid==true && this.CurrencyControl.valid==true){
       error=false;
    }
    else{
      error=true; 
    }

    console.log(error); 

    this.logo_error=(this.CompanyLogo==null)?true:false;  //Show the custom error messages.
    this.terms_error=(this.TermsConditionsControl.value!="yes")?true:false;  //Show the custom error messages.
        
    if(error==false){
        //now check the email address is not duplicate.
        this.vms_api.checkDuplicateAccount(this.EmailControl.value).subscribe(data=>{
            let response=JSON.parse(JSON.stringify(data));  
            if(response.data.total_count > 0){
              this.alertMessage="Your company is already registered with us, please use a different email address to proceed !";
              this.alertClass=["alert","alert-danger"]; 
              return false; 
            }
            else{
              this.alertMessage=null; 
              this.alertClass=null; 
            }
            this.SubmitButtonStyle={"display":"block"}; //this will show the paypal button and then transaction can be processed.
        },
        error=>{
            console.log(error); 
        });
    }
  
}

  ngOnInit() {
    this.listAllPlans();
  }

  ngAfterViewInit(): void {
    
    var instance=this;
    this.loadExternalScript("https://www.paypal.com/sdk/js?client-id="+this.vms_api.paypal_client_id).then(() => {
      paypal.Buttons({
        createOrder: function(data, actions) {
          var plan_cost=this.plansArray[this.PlanControl.value];
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: plan_cost,
                currency: 'USD'
              }
            }]
          });
        },
        onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
            console.log(details); 
            // Call your server to save the transaction
            instance.saveRegistrationDetails(details); 
            
          });
        }
      }).render('#paypal_button');
    });
    
  } // Function ends here.

  saveRegistrationDetails(payment_transaction_reponse){
    var registration_response;
    this.vms_api.BeginCompanyRegistration(this.CompanyNameControl.value, this.EmailControl.value, this.PasswordControl.value, this.PhoneControl.value, this.CurrencyControl.value, this.PlanControl.value, this.CompanyLogo, payment_transaction_reponse).subscribe(
      data=>{
           registration_response=JSON.parse(JSON.stringify(data)); 
           if(registration_response.http_response_code==200){
            this.RegistrationSuccessful=true; 
            this.alertClass="alert alert-success";
            this.alertMessage=registration_response.verbose_message;
            this.SubmitButtonStyle={"display":"none"};
           }
           else{
             this.RegistrationSuccessful=false;
             this.alertClass="alert alert-danger";
             this.alertMessage=registration_response.verbose_message; 
             this.SubmitButtonStyle={"display":"block"};
           }

      },
      error=>{
          console.log(error); 
      }
    );
  }
  uploadCompanyLogo(event){
     this.CompanyLogo=event.target.files[0]; //Company Logo Uploaded.
     this.logo_error=false; 
  }

   redirectLogin(){
     this.router.navigateByUrl("/login"); 
   }

  listAllPlans(){
    this.vms_api.getAllPlans().subscribe(data=>{
        let result=JSON.parse(JSON.stringify(data)); 
        this.plans=result.data;
        var pl_id=0; 
        this.plansArray=new Array(); 
        for(var i=0;i<this.plans.length;i++){
          pl_id=this.plans[i].plan_id;
          this.plansArray[pl_id]=this.plans[i].plan_price;
        }
        console.log(this.plans); 
    },
    error=>{
          console.log(error);
    }); 

  }

}
