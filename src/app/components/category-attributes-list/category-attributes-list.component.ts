import { Component, Input, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ToastrService } from 'ngx-toastr';
import { CategoryAttributeService } from 'src/app/services/CategoryAttributeService';
import { Dialogservice } from 'src/app/services/dialog.service';
import { VMCategory } from 'src/app/viewmodels/VMCategory';
import { VMCategoryAttribute } from 'src/app/viewmodels/VMCategoryAttribute';

@Component({
  selector: 'app-category-attributes-list',
  templateUrl: './category-attributes-list.component.html',
  styleUrls: ['./category-attributes-list.component.css']
})
export class CategoryAttributesListComponent implements OnInit {
  @Input() Category:VMCategory
  CategoryAttributes:VMCategoryAttribute[]=[];
  constructor(
    private toaster:ToastrService,
    private CategoryAttSRV:CategoryAttributeService,
    private dailogSRV:Dialogservice
  ) { }

  ngOnInit(): void {
    this.GetAttributes(this.Category.Id);
  }
  GetAttributes(id:number){
    this.CategoryAttSRV.GetAllOfCategory(id).subscribe(res=>{
      if(res==null||res.length==0){
        this.toaster.info("No Attributes Found");
      }
      else{
        this.CategoryAttributes=res;
      }
    },err=>{
      this.CategoryAttributes=[];
      this.toaster.error("Server Error");
    });
  }
  add(){
    let categoratt=new VMCategoryAttribute(0,'','Text',this.Category.Id);
    this.dailogSRV.OpenCategoryAttributeDialog(categoratt).afterClosed().subscribe(res=>{
      if(res!=false){
        this.CategoryAttributes.push(res);
      }
    })
  }
  select(t:VMCategoryAttribute){
    this.CategoryAttributes.forEach(element => {
      element.Selected=false;
    });
    t.Selected=true;
    this.CategoryAttSRV.CurrentAttribute.next(t);
  }
  delete(t:VMCategoryAttribute){
    this.CategoryAttSRV.Delete(t.Id).subscribe(res=>{
      let index=this.CategoryAttributes.indexOf(t);
      this.CategoryAttributes.splice(index,1);
      this.toaster.success("Attribute Deleted");
      if(t.Selected==true){
        this.CategoryAttSRV.CurrentAttribute.next(null);
      }
    },err=>{
      this.toaster.error(err.message);
    });
  }
}
