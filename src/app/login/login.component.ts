import { Component, OnInit } from '@angular/core';
import { VmsApiService } from '../vms-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user_email:string;
  private user_password:string;
  public button_submitting_style;
  public login_button_style;
  public scenery_background; 
  public alertMessage;
  public alertClass;

  constructor(private vms_api:VmsApiService,private router: Router) { 
    //this['user_email']='n.srinivasulurao@gmail.com';
    //this['user_password']='ATG2dfPQ';  
    this.button_submitting_style={"display":"none"};
    this.login_button_style={"display":"inline-block"};
    this.scenery_background={"min-height":"700px"}; 
    this.alertClass="";


  }

  ngOnInit() {
  }

  navigateRegistrationPage(){
    this.router.navigateByUrl("/register"); 
  }

  AttemptLogin(){
    this.button_submitting_style={"display":"inline-block"};
    this.login_button_style={"display":"none"};
    //Now call the service to get the data.
    this.vms_api.AttemptLogin(this.user_email,this.user_password).subscribe(data=>{
      var response=JSON.parse(JSON.stringify(data));
      if(response.http_response_code==200){
        this.alertClass="alert alert-success";
        this.alertMessage="Message: "+response.verbose_message;
        this.button_submitting_style={"display":"none"};
        this.login_button_style={"display":"inline-block"};

        //Store the values to the angular session.
        for(var prop in response.data){
          localStorage.setItem(prop,response.data[prop]); 
        } 
        
        this.router.navigateByUrl("/dashboard"); 
      } 
      else{
        this.alertClass="alert alert-danger";
        this.alertMessage="Error: "+response.verbose_message;
        this.button_submitting_style={"display":"none"};
        this.login_button_style={"display":"inline-block"};
      }
      
    },
    error=>{
        console.log(error); 
        this.alertClass="alert alert-danger";
        this.alertMessage="Error: "+error.message;
        this.button_submitting_style={"display":"none"};
        this.login_button_style={"display":"inline-block"};
     }); //Ajax Call ends here.
     
  }
}
