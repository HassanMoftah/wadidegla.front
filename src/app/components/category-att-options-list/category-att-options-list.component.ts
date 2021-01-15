import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CategoryAttributeOptionService } from 'src/app/services/CategoryAttributeOptionService';
import { CategoryAttributeService } from 'src/app/services/CategoryAttributeService';
import { Dialogservice } from 'src/app/services/dialog.service';
import { VMCategory } from 'src/app/viewmodels/VMCategory';
import { VMCategoryAttribute } from 'src/app/viewmodels/VMCategoryAttribute';
import { VMCategoryAttributeOption } from 'src/app/viewmodels/VMCategoryAttributeOption';

@Component({
  selector: 'app-category-att-options-list',
  templateUrl: './category-att-options-list.component.html',
  styleUrls: ['./category-att-options-list.component.css']
})
export class CategoryAttOptionsListComponent implements OnInit,OnDestroy {
  currentcategoryatt:VMCategoryAttribute;
  options:VMCategoryAttributeOption[]=[];
  subscription:Subscription;
  constructor(
    private Toaster:ToastrService,
    private CategoryAttOptionSRV:CategoryAttributeOptionService,
    private CategoryAttSRV:CategoryAttributeService,
    private DialogSRV:Dialogservice
  ) { }
  ngOnDestroy(): void {
   if(this.subscription){
     this.CategoryAttSRV.CurrentAttribute.next(null);
     this.subscription.unsubscribe();
   }
  }

  ngOnInit(): void {
   this.subscription= this.CategoryAttSRV.CurrentAttribute.subscribe(res=>{
      this.currentcategoryatt=res;
      this.options=[];
      if(res!=null&&(res.Type=='Options'||res.Type=='Multiline')){
      
      this.Getoptions();}
     
    });
    
  }
  add(){
    let option=new VMCategoryAttributeOption(0,'',this.currentcategoryatt.Id);
    this.DialogSRV.OpenCategoryAttribOptionDialog(option).afterClosed().subscribe(res=>{
      if(res!=false){
        this.options.push(res);
      }
    });
  }
  Getoptions(){
    if(this.currentcategoryatt.Type=='Text'||(this.currentcategoryatt.Type=='Yes/No')){
      this.Toaster.info("Not Options For Text & Yes/No Attributes ");
    }
    else{

    
   this.CategoryAttOptionSRV.GetAllOfCategoryAttribute(this.currentcategoryatt.Id).subscribe(res=>{
     if(res==null||res.length==0){
        this.Toaster.info("No Options Found")
     }
     else{
       this.options=res;
     }
   },
    err=>{
      this.Toaster.error(err.message);
    })}
  }
  delete(o:VMCategoryAttributeOption){
    this.CategoryAttOptionSRV.Delete(o.Id).subscribe(res=>{
       let index=this.options.indexOf(o);
       this.options.splice(index,1);
       this.Toaster.success("Option Deleted");
    },err=>{
       this.Toaster.error(err.message);
    });
  }
  addbuttonDisable(){
    if(this.currentcategoryatt==null||this.currentcategoryatt==undefined){
      return true;
    }
    else if(this.currentcategoryatt.Type=="Text"||this.currentcategoryatt.Type=='Yes/No'){
      return true;
    }
    else{
      return false;
    }
  }
}
