import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryAttributeOptionService } from 'src/app/services/CategoryAttributeOptionService';
import { VMCategoryAttributeOption } from 'src/app/viewmodels/VMCategoryAttributeOption';
@Component({
  selector: 'category-attribute-option-dialog',
  templateUrl: './category-attribute-option-dialog.component.html',
  styleUrls: ['./category-attribute-option-dialog.component.css']
})
export class CategoryAttributeOptionDialogComponent implements OnInit {
  categoryAttrOption: VMCategoryAttributeOption;
  IsEdit=false;
  title="Add New Category Attribute Option"
  Proccessing=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogref: MatDialogRef<CategoryAttributeOptionDialogComponent>,
    private ToasterSRV:ToastrService,
    private CategoryAttOptionSRV:CategoryAttributeOptionService
  ) { }

  ngOnInit(): void {
    this.categoryAttrOption=this.data.Value;
    if(this.categoryAttrOption.Id>0){this.IsEdit=true;}
  }
  add(){
    this.CategoryAttOptionSRV.Add(this.categoryAttrOption).subscribe(res=>{
       this.dialogref.close(res);
    },err=>{
      this.ToasterSRV.error(err.message)
      this.dialogref.close(false);
    });
  }
  save(){
    this.Proccessing=true;
    if(this.IsEdit){
      this.edit();
    }
    else{
      this.add();
    }
  }
  edit(){
   /* this.CategoySRV.edit(this.category).subscribe(res=>{
      this.dialogref.close(res);
   },err=>{
     this.toasterSRv.error(err.message)
     this.dialogref.close(false);
   });*/
  }
  cancel(){
    this.dialogref.close(false);
  }

}
