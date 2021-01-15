import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "./components/categories/categories.component";
import { CategorypageComponent } from "./components/categorypage/categorypage.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";

const routes:Routes=[
    {path: '', redirectTo: '/Home/Categories', pathMatch:'full'},
    {path: 'Home', component:HomeComponent, children:[
    {path: '', redirectTo: '/Home/Categories', pathMatch: 'full'},
    {path:'Products',component:ProductsComponent},
    {path:'Categories',component:CategoriesComponent},
    {path:'Category',component:CategorypageComponent}
    ]}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}