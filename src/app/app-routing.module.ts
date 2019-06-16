import {NgModule} from "@angular/core";
import {Routes,RouterModule, Router} from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { VouchersComponent } from "./vouchers/vouchers.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { ProductsComponent } from "./products/products.component";
import { AddProductComponent } from "./add-product/add-product.component";

const routes: Routes=[
    {path:"",component:HomePageComponent}, //Or you can go for redirect component with redirectTo and pathMatch parameter.
    {path:"login",component:LoginComponent},
    {path:"dashboard",component:DashboardComponent},
    {path:"change-password",component:ChangePasswordComponent},
    {path:"vouchers-list",component:VouchersComponent}, 
    {path:"products",component:ProductsComponent},
    {path:"my-account",component:MyProfileComponent},
    {path:'add-product',component:AddProductComponent},
    {path:"**", component:PageNotFoundComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}
export const routingComponents=[LoginComponent]


