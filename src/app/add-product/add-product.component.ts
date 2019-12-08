import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { VmsApiService } from '../vms-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public ProductNameControl=new FormControl('',[Validators.required]);
  public SpecificationControl=new FormControl('', Validators.required);
  public SpecificationOptionsControl=new FormControl('', Validators.required);
  public PriceControl=new FormControl('', Validators.required);
  public QuantityControl=new FormControl('', Validators.required);
  public alertClass:any;
  public alertMsg:any; 
  public button_submitting_style:any;
  public submit_button_style:any;
  public product_image:any;
  public image_input_added:any;

  constructor(private vms_api:VmsApiService, private router:Router) {
    this.alertClass="";
    this.alertMsg=""; 
    // this['product_name']="Nike SB Delta Sneakers"; 
    // this['specification']="Skateboard Sneakers";
    // this['specification_options']="color:white,blue,black|size:6,7,8,9,10,11,12"; 
    // this['price']=200;
    // this['quantity']=30;

    this.button_submitting_style={"display":"none"};
    this.submit_button_style={display:"block"}; 
   }

  ngOnInit() {
  }

  ProductImageUpload(image_info){
    this.product_image=image_info.target.files[0];
    this.image_input_added=true; 
  }

  addProduct(){

    if(this.ProductNameControl.hasError('required') || this.SpecificationOptionsControl.hasError('required') || this.SpecificationOptionsControl.hasError('required') || this.PriceControl.hasError('required') || this.QuantityControl.hasError('required')){
      //Just don't do anything, let the user rectify his issues.
   }
   else{
    this.button_submitting_style={"display":"block"};
    this.submit_button_style={display:"none"};
   this.vms_api.addNewProduct(localStorage.getItem('user_id'), this.ProductNameControl.value,this.SpecificationControl.value, this.SpecificationOptionsControl.value, this.PriceControl.value, this.QuantityControl.value, this.product_image).subscribe(data=>{
      var response=JSON.parse(JSON.stringify(data)); 
      if(response.http_response_code==200){
      this.alertClass="alert alert-success";
      this.alertMsg=response.verbose_message; 
      var instance=this;
      setTimeout(function(){
        instance.router.navigateByUrl('/products'); 
        },2000);
      }
      else{
        this.alertClass="alert alert-danger";
        this.alertMsg=response.verbose_message; 
      }

      this.button_submitting_style={"display":"none"};
      this.submit_button_style={display:"block"};

   },
   error=>{
    console.log(error); 
    this.alertClass="alert alert-danger"; 
    this.alertMsg=error.message;
   },);
 }
  }



}
