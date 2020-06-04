import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public app_name:string;
  constructor(public router: Router) { 
  this.app_name="Voucher Management System"; 
  }

  ngOnInit() {
    //if the localstorage doesn't have user_id value then send him to login page.
    if(localStorage.getItem('user_id')==null || localStorage.getItem('user_id')==undefined){
      this.router.navigateByUrl('/login'); 
    }
  }

  showDropDownMenu(){
    $('.dropdown-menu')[0].style.display="block"; 

    $('.content-right').click(function(){
     $('.dropdown-menu')[0].style.display="none";
    });
  }

  redirectTo(page){
    this.router.navigateByUrl("/"+page); 
  }

  navigateMyAccount(){
    this.router.navigateByUrl('/my-account'); 
  }

  LOGOUT(){
    //Clear the localstorage.
    localStorage.clear(); 
    this.router.navigateByUrl('/login'); 
  }

}
