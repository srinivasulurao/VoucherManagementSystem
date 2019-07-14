import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { VmsApiService } from '../vms-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  public ProductNameControl=new FormControl('',[Validators.required]);
  public SpecificationControl=new FormControl('', Validators.required);
  public SpecificationOptionsControl=new FormControl('', Validators.required);
  public PriceControl=new FormControl('', Validators.required);
  public QuantityControl=new FormControl('', Validators.required);
  public alertClass:any;
  public alertMsg:any; 
  public button_submitting_style:any;
  public submit_button_style:any;
  public product_id:any;

  constructor(private vms_api:VmsApiService, private router:Router, private activated_route:ActivatedRoute) {
    this.alertClass="";
    this.alertMsg=""; 
    this.button_submitting_style={"display":"none"};
    this.submit_button_style={display:"block"}; 
   }

  ngOnInit() {
    this.product_id=parseInt(this.activated_route.snapshot.paramMap.get('id'));
    //Get product details.
    this.vms_api.loadProductData(localStorage.getItem('user_id'),this.product_id).subscribe(data=>{
       var result=JSON.parse(JSON.stringify(data));
       console.log(result);
       if(result.http_response_code==200){
        this.ProductNameControl.setValue(result.data.product_name); 
        this.SpecificationControl.setValue(result.data.specification);
        this.SpecificationOptionsControl.setValue(result.data.specification_options);
        this.PriceControl.setValue(result.data.price);
        this.QuantityControl.setValue(result.data.quantity); 
       }
       else{
        this.alertClass="alert alert-danger";
        this.alertMsg=result.verbose_message;
       }
    },
    error=>{
      console.log(error);
    });
        
    
  }

  saveProduct(){

    if(this.ProductNameControl.hasError('required') || this.SpecificationOptionsControl.hasError('required') || this.SpecificationOptionsControl.hasError('required') || this.PriceControl.hasError('required') || this.QuantityControl.hasError('required')){
      //Just don't do anything, let the user rectify his issues.
   }
   else{
    this.button_submitting_style={"display":"block"};
    this.submit_button_style={display:"none"}; 

    this.vms_api.editProduct(localStorage.getItem('user_id'),this.product_id, this.ProductNameControl.value,this.SpecificationControl.value, this.SpecificationOptionsControl.value, this.PriceControl.value, this.QuantityControl.value).subscribe(data=>{
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
   });
 }
  }

} //Class ends here.
