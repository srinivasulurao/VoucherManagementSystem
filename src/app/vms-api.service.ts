import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VmsApiService {
  public webservice="http://localhost:81/VoucherManagementSystem/api/";
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

  loadVoucherData(voucher_id,user_id){
    let postParams=new FormData();   
    postParams.append('user_id',user_id);
    postParams.append('voucher_id',voucher_id); 
    return this.http.post(this.webservice+"get-voucher-details",postParams); 
  }

  loadProductList(user_id){
    let postParams=new FormData();
    postParams.append('user_id',user_id);
    return this.http.post(this.webservice+"get-company-products",postParams);
  }

  loadProductData(user_id,product_id){
    let postParams=new FormData();   
    postParams.append('user_id',user_id);
    postParams.append('product_id',product_id); 
    return this.http.post(this.webservice+"get-product-details",postParams);
  }

  updateVoucherDetails(user_id, voucher_id, voucher_validity, product_linked, redemption_status, enabled, created_on, redeemed_on, notes){

    var rs=(redemption_status=='yes')?1:0;
    var enbl=(enabled=='yes')?1:0;  

    var vv_date=new Date(voucher_validity);
    var co_date=new Date(created_on); 
    var ro_date=new Date(redeemed_on); 

    //Some Bug in New Date function, as it stars with count 0
    co_date.setMonth(co_date.getMonth()+1);  
    ro_date.setMonth(ro_date.getMonth()+1);
    vv_date.setMonth(vv_date.getMonth()+1); 

    let postParams=new FormData();
    postParams.append('user_id',user_id);
    postParams.append('voucher_id',voucher_id);
    postParams.append('voucher_validity',vv_date.getFullYear()+'-'+vv_date.getMonth()+'-'+vv_date.getDate()+' '+'00:00:00');   
    postParams.append('product_linked',product_linked.split('product_').join(''));
    postParams.append('redemption_status',rs.toString());
    postParams.append('enabled',enbl.toString());
    postParams.append('created_on',co_date.getFullYear()+'-'+co_date.getMonth()+'-'+co_date.getDate()+' '+'00:00:00');
    postParams.append('redeemed_on',ro_date.getFullYear()+'-'+ro_date.getMonth()+'-'+ro_date.getDate()+' '+'00:00:00');
    postParams.append('notes',notes); 

    return this.http.post(this.webservice+'submit-voucher-details',postParams);
  }

  uploadVoucherCSVFile(user_id, csv_file){
     let postParams=new FormData();
     postParams.append('user_id',user_id); 
     postParams.append('voucher_csv',csv_file);
     return this.http.post(this.webservice+"upload-vouchers",postParams); 
  }

  addNewProduct(user_id,product_name,specification, specification_options, price, quanity){
    let postParams=new FormData(); 
    postParams.append('user_id',user_id);
    postParams.append('price',price);
    postParams.append('product_name',product_name);
    postParams.append('specification',specification);
    postParams.append('specification_options',specification_options); 
    postParams.append('quantity',quanity);
    return this.http.post(this.webservice+'add-new-product',postParams);
  }

  editProduct(user_id,product_id,product_name,specification, specification_options, price, quanity){
    let postParams=new FormData(); 
    postParams.append('user_id',user_id); 
    postParams.append('price',price);
    postParams.append('product_id',product_id); 
    postParams.append('product_name',product_name);
    postParams.append('specification',specification);
    postParams.append('specification_options',specification_options); 
    postParams.append('quantity',quanity);
    return this.http.post(this.webservice+'update-product-details',postParams); 
  }



}//Service Class ends here.
