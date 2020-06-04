import { Component, OnInit,ViewChild } from '@angular/core';
import { VmsApiService } from '../vms-api.service';
import { MatPaginator, MatTableDataSource,MatSort } from '@angular/material';

export interface Messages {
  message_id: string;
  message: string;
  message_date:string;
  message_from: string;
}

@Component({
  selector: 'app-communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.css']
})
export class CommunicationsComponent implements OnInit {

  public messages:any;
  public alertMessage:any;
  public alertClass:any;
  dataSource: MatTableDataSource<Messages>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private vms_api:VmsApiService) { 


  }

  ngOnInit() {

    let user_id=localStorage.getItem('user_id'); 
    this.messages=this.vms_api.getCustomerMessages(user_id).subscribe(data=>{
          let response=JSON.parse(JSON.stringify(data));
          this.messages=response.data;
          this.dataSource=new MatTableDataSource(this.messages);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort; 
    },error=>{ 
         this.alertClass="alert alert-danger"; 
         this.alertMessage=error.message;

    });

  }

}
