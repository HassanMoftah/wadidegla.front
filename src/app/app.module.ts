import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routingModule';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategorytreeleafComponent } from './components/categorytreeleaf/categorytreeleaf.component';
import { HttpClientModule } from '@angular/common/http';
import { CategorydialogComponent } from './dialogs/categorydialog/categorydialog.component';
import { CategorypageComponent } from './components/categorypage/categorypage.component';
import { CategoryAttributedialogComponent } from './dialogs/category-attributedialog/category-attributedialog.component';
import { CategoryAttributesListComponent } from './components/category-attributes-list/category-attributes-list.component';
import { CategoryAttributeOptionDialogComponent } from './dialogs/category-attribute-option-dialog/category-attribute-option-dialog.component';
import { CategoryAttOptionsListComponent } from './components/category-att-options-list/category-att-options-list.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CategoriesComponent,
    NavbarComponent,
    HomeComponent,
    CategorytreeleafComponent,
    CategorydialogComponent,
    CategorypageComponent,
    CategoryAttributedialogComponent,
    CategoryAttributesListComponent,
    CategoryAttributeOptionDialogComponent,
    CategoryAttributedialogComponent,
    CategoryAttOptionsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
      maxOpened: 10,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
    }),
    MatToolbarModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
