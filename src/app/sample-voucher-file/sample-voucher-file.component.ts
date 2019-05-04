import { Component, OnInit } from '@angular/core';
import { VmsApiService } from '../vms-api.service';

@Component({
  selector: 'app-sample-voucher-file',
  templateUrl: './sample-voucher-file.component.html',
  styleUrls: ['./sample-voucher-file.component.css']
})
export class SampleVoucherFileComponent implements OnInit {

  constructor(public vms_api:VmsApiService) { }

  ngOnInit() {
  }

  downloadSampleCSVFile(){
    window.location.assign(this.vms_api.webservice.toString().split("api").join("")+'storage/sample_voucher_upload.csv'); 
  }
}
