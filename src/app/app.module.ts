import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  

//######################################################################################
// We have to add the angular material, it is the standard UI framework for Angular.
//######################################################################################
import { MatDialogModule, MatNativeDateModule, MatInputModule, MatSortModule, MatPaginatorModule, MatCardModule, MatDividerModule} from '@angular/material';  
import { MatButtonModule } from '@angular/material';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from  '@angular/material'; 
import { MatBadgeModule } from '@angular/material'; 
import { MatProgressBarModule } from '@angular/material'; 
import { MatTableModule } from '@angular/material/table';
//######################################################################################
//These are for the entrycomponents as a part of angular material framework.
//######################################################################################

import { DeleteWarningComponent } from './delete-warning/delete-warning.component';
import { VoucherDetailsComponent } from './voucher-details/voucher-details.component';
import { ProductsComponent } from './products/products.component';
import { SampleVoucherFileComponent } from './sample-voucher-file/sample-voucher-file.component';
import { UploadVoucherComponent } from './upload-voucher/upload-voucher.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddProductComponent } from './add-product/add-product.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomePageComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    ChangePasswordComponent,
    VouchersComponent,
    DeleteWarningComponent,
    VoucherDetailsComponent,
    ProductsComponent,
    SampleVoucherFileComponent,
    UploadVoucherComponent,
    MyProfileComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatDividerModule
  ], 
  entryComponents:[
    DeleteWarningComponent,
    VoucherDetailsComponent,
    SampleVoucherFileComponent,
    UploadVoucherComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
