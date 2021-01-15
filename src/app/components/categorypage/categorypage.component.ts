import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/CategoryService';
import { VMCategory } from 'src/app/viewmodels/VMCategory';

@Component({
  selector: 'app-categorypage',
  templateUrl: './categorypage.component.html',
  styleUrls: ['./categorypage.component.css'],
})
export class CategorypageComponent implements OnInit {
  category:VMCategory;
  Loaded=false;
  constructor(private Router: Router,
     private ActivatedRoute: ActivatedRoute,
     private categorySRV:CategoryService,
     private Toaster:ToastrService
     ) {}

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe(params=>{
      let id=parseInt( params.get("id"));
      this.GetCategory(id);
    });
  }
  GetCategory(id:number){
    this.categorySRV.Get(id).subscribe(res=>{
      this.category=res;
      this.Loaded=true;
    },err=>{
      this.Toaster.error(err.message);
      this.Loaded=true;
    });
  }
}
