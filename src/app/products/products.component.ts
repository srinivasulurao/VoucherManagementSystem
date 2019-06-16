import { Component, OnInit, ViewChild } from '@angular/core';
import { VmsApiService } from '../vms-api.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router} from '@angular/router'; 
export interface ProductList {
  product_id: string;
  product_name: string;
  specification:string;
  price: string;
  quantity: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products:any;
  public currency:any;
  public alertMessage:string;
  public alertClass:string; 
  displayedColumns: string[] = ['Product ID', 'Product Name', 'Specification', 'Price','Quantity','View','Delete'];
  dataSource: MatTableDataSource<ProductList>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private vms_api:VmsApiService, private router:Router) { 
    this.currency=localStorage.getItem('currency'); 
    this.alertClass="";
    this.alertMessage=""; 
  }
//Just copy paste the function from the documentation site.
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit() {
   
    var user_id=localStorage.getItem('user_id'); 
    this.vms_api.loadProductList(user_id).subscribe(data=>{
       var response=JSON.parse(JSON.stringify(data));
       this.products=response.data; 
       this.dataSource=new MatTableDataSource(this.products);  
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
    },
    error=>{
    }); 

  }

  redirectToAddNewProductPage(){
    this.router.navigateByUrl('/add-product'); 
  }

}
