import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/CategoryService';
import { VMCategory } from 'src/app/viewmodels/VMCategory';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-categorydialog',
  templateUrl: './categorydialog.component.html',
  styleUrls: ['./categorydialog.component.css'],
})
export class CategorydialogComponent implements OnInit {
  category: VMCategory;
  IsEdit=false;
  title="Add New Category"
  Proccessing=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogref: MatDialogRef<CategorydialogComponent>,
    private toasterSRv: ToastrService,
    private CategoySRV: CategoryService
  ) {}

  ngOnInit(): void {
    this.category=this.data.Value;
    if(this.category.Id>0){this.IsEdit=true;}
  }
  add(){
    this.CategoySRV.Add(this.category).subscribe(res=>{
       this.dialogref.close(res);
    },err=>{
      this.toasterSRv.error(err.message)
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
