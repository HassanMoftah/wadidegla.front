import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryAttributeService } from 'src/app/services/CategoryAttributeService';
import { VMCategoryAttribute } from 'src/app/viewmodels/VMCategoryAttribute';

@Component({
  selector: 'app-category-attributedialog',
  templateUrl: './category-attributedialog.component.html',
  styleUrls: ['./category-attributedialog.component.css']
})
export class CategoryAttributedialogComponent implements OnInit {
  categoryAttr: VMCategoryAttribute;
  IsEdit=false;
  title="Add New Category Attribute"
  Proccessing=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogref: MatDialogRef<CategoryAttributedialogComponent>,
    private ToasterSRV:ToastrService,
    private CategoryAttSRV:CategoryAttributeService
  ) { }

  ngOnInit(): void {
    this.categoryAttr=this.data.Value;
    if(this.categoryAttr.Id>0){this.IsEdit=true;}
  }
  add(){
    this.CategoryAttSRV.Add(this.categoryAttr).subscribe(res=>{
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
