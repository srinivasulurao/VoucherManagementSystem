import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public avatar:string;
  public company_name:string;
  public sidebar_links:any;
  public active_url:string;
  public sticky_sidebar_style:any;

  constructor(private router:Router) {

    this.avatar="http://pluspng.com/img-png/logo-flipkart-png-flipkart-coupons-discount-offers-promo-codes-200.png"; 
    this.company_name=localStorage.getItem('company_name'); 

    //Set the sticky left bar, screen height.
    this.sticky_sidebar_style={"min-height":(screen.height-83)+"px"}; 
   }

  ngOnInit() {

    this.sidebar_links=[
      {"link_name":"Dashboard","link_url":"/dashboard","icon":"fa fa-tachometer","class":"dashboard"},
      {"link_name":"Vouchers","link_url":"/vouchers-list","icon":"fa fa-keyboard-o","class":"vouchers-list"},
      {"link_name":"Products","link_url":"/products","icon":"fa fa-product-hunt","class":"products"},
      {"link_name":"Recieved Orders","link_url":"/orders","icon":"fa fa-shopping-cart","class":"order"},
      {"link_name":"Embed Cart","link_url":"/cart-embedding","icon":"fa fa-code","class":"cart-embedding"},
      {"link_name":"Change Password","link_url":"/change-password","icon":"fa fa-key","class":"change-password"},
      {"link_name":"Communication","link_url":"/customer-messages","icon":"fa fa-comments-o","class":"customer-messages"}
    ];

     //get the current link
      var active_url=this.router.url.split("/").join("");
      setTimeout(function(){
        if(document.querySelectorAll(".flex-column ."+active_url).length > 0){
         document.querySelectorAll(".flex-column ."+active_url)[0].classList.add('active'); 
        }
      },1000); 
      
      if(active_url=='add-product'){
        setTimeout(function(){
          if(document.querySelectorAll(".flex-column .products").length > 0){
           document.querySelectorAll(".flex-column .products")[0].classList.add('active');
          }
        },1000); 
      }
  }

  routePage(link){

    //Usage of a normal anchor tag is not a good option, router redirects the page so smoothly.
    this.router.navigateByUrl(link); 
  }

} //Class Ends here.
