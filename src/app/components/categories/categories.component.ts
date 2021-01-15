import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/CategoryService';
import { Dialogservice } from 'src/app/services/dialog.service';
import { VMCategory } from 'src/app/viewmodels/VMCategory';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: VMCategory[] = [];
 
  constructor(
    private toasterSRV: ToastrService,
    private CategorySRV: CategoryService,
    private dialogSRV:Dialogservice
  ) {}

  ngOnInit(): void {
    this.CategorySRV.GetAllFirstParents().subscribe(
      (res) => {
        if (res == null || res.length == 0) {
          this.toasterSRV.info('No Categories found');
        } else {
          this.categories = res;
        }
        
      },
      (err) => {
        this.toasterSRV.error('server error');
       
      }
    );
  }
  add() {
    let category=new VMCategory(0,'',0);
    this.dialogSRV.OpenCategoryDialog(category).afterClosed().subscribe(res=>{
     if(res!=false){
       this.categories.push(res);
     }
    });
  }
  delete(id:number){
    this.CategorySRV.Delete(id).subscribe(res=>{
      let index=this.categories.findIndex(x=>x.Id==id);
      this.categories.splice(index,1);
      this.toasterSRV.success("Category Deleted");
    },err=>{
      console.log(err);
      this.toasterSRV.error(err.message);
    });
  }
}
