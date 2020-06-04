import { Component, OnInit } from '@angular/core';
import { VmsApiService } from'../vms-api.service';

@Component({
  selector: 'app-embed-cart',
  templateUrl: './embed-cart.component.html',
  styleUrls: ['./embed-cart.component.css']
})
export class EmbedCartComponent implements OnInit {

  public static_cart_code:any;
  public alertMessage:any;
  public alertClass:any;

  constructor(public vms_api:VmsApiService) { // I believe this is called first.
    
  }

  ngOnInit() {

    let cart_generating_url=this.vms_api.cart_url+btoa(localStorage.getItem('user_id')).split("=").join("");
    cart_generating_url+="/"+btoa(localStorage.getItem('email')).split("=").join(""); 

    //console.log(Object.entries(localStorage)); 

    this.static_cart_code="<script src='"+cart_generating_url+"'> document.write(cart);</script>"; 
  }

  CopyCartCode(){
      var code=document.getElementById('cart_code_box') as HTMLInputElement;  
      code.select();
      document.execCommand("copy"); 
      this.alertMessage="Cart Code Copied !"; 
      this.alertClass="alert alert-success"; 
  }

}
