import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/CategoryService';
import { Dialogservice } from 'src/app/services/dialog.service';
import { VMCategory } from 'src/app/viewmodels/VMCategory';

@Component({
  selector: 'app-categorytreeleaf',
  templateUrl: './categorytreeleaf.component.html',
  styleUrls: ['./categorytreeleaf.component.css'],
})
export class CategorytreeleafComponent implements OnInit {
  @Input() category: VMCategory;
  @Output() Deleted:EventEmitter<number>=new EventEmitter<number>();
  childs: VMCategory[];
  constructor(
    private ToasterSRV: ToastrService,
    private CategorySRV: CategoryService,
    private dialogSRV:Dialogservice,
    private router:Router
  ) {}

  ngOnInit(): void {}
  add() {
    let category=new VMCategory(0,'',this.category.Id);
    this.dialogSRV.OpenCategoryDialog(category).afterClosed().subscribe(res=>{
      if(res!=false){
        this.category.Open=false;
        setTimeout(()=>{this.toggle();}, 300);
      }
    });
  }
  toggle() {
    this.category.Open = !this.category.Open;
    if (this.category.Open == true) {
      this.GetChilds();
    }
  }
  GetChilds() {
   
    this.CategorySRV.GetAllOfParent(this.category.Id).subscribe(
      (res) => {
        this.childs = res;
      },
      (err) => {
        this.childs = [];
      }
    );
  }
  delete(id:number){
    this.CategorySRV.Delete(id).subscribe(res=>{
      let index=this.childs.findIndex(x=>x.Id==id);
      this.childs.splice(index,1);
      this.ToasterSRV.success("Category Deleted");
    },err=>{
      this.ToasterSRV.error(err.message);
    });
  }
  deleteclicked(){
    this.Deleted.emit(this.category.Id);
  }
  gotocatgorypage(){
    this.router.navigate(['/Home/Category', { id: this.category.Id }]);
  }
}
