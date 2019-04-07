import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VmsApiService {
  private webservice="http://localhost:81/VoucherManagementSystem/api/";
  public image_dir="http://localhost:81/VoucherManagementSystem/storage/app/images/";
  constructor(private http:HttpClient) { }

  AttemptLogin(email,password){
    let postParams=new FormData();
    postParams.append('email',email);
    postParams.append('password',password);
    return this.http.post(this.webservice+"do-login", postParams);
  }

  changePassword(user_id,new_password){
    let postParams=new FormData();
    postParams.append('user_id',user_id);
    postParams.append('new_password',new_password);
    return this.http.post(this.webservice+"change-password",postParams); 
  }

  getUserVouchers(user_id){
    let postParams=new FormData();
    postParams.append('user_id', user_id);
    return this.http.post(this.webservice+"get-user-vouchers",postParams); 
  }

  disableEnableVoucher(voucher_id,user_id,status){
    let postParams=new FormData();
    postParams.append('user_id',user_id);
    postParams.append('voucher_id',voucher_id);
    postParams.append('status',status);
    return this.http.post(this.webservice+"disable-enable-voucher",postParams); 
  }

  changeRedemptionStatus(voucher_id,user_id,status){
    let postParams=new FormData();
    postParams.append('user_id',user_id);
    postParams.append('voucher_id',voucher_id);
    postParams.append('redemption_status',status);
    return this.http.post(this.webservice+"change-redemption_status",postParams); 
  }

  deleteVoucher(voucher_id,user_id){
    let postParams=new FormData();
    postParams.append('user_id',user_id);
    postParams.append('voucher_id',voucher_id);
    return this.http.post(this.webservice+"delete-voucher",postParams);
  }





}//Service Class ends here.
