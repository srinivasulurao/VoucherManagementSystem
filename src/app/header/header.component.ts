import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public app_name:string;
  constructor() { 
  this.app_name="Voucher Management System"; 
  }

  ngOnInit() {
  }

}
