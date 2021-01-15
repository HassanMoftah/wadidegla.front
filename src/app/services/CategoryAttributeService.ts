import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VMCategoryAttribute } from '../viewmodels/VMCategoryAttribute';

@Injectable({
  providedIn: 'root',
})
export class CategoryAttributeService {
  apiUrl = environment.backend + 'CategoryAttribute/';
  CurrentAttribute:BehaviorSubject<VMCategoryAttribute>=new BehaviorSubject<VMCategoryAttribute>(null);
  constructor(private http: HttpClient) {}
  GetAllOfCategory(id: number) {
    let url = this.apiUrl + 'GetAllOfCategory?id=' + id;
    return this.http.get<VMCategoryAttribute[]>(url).pipe(catchError(this.errorhandler));
  }

  Add(categoryatt: VMCategoryAttribute) {
    let url = this.apiUrl + 'Add';
    return this.http
      .post<VMCategoryAttribute>(url, categoryatt)
      .pipe(catchError(this.errorhandler));
  }
  Delete(id: number) {
    let url = this.apiUrl + 'Delete?id=' + id;
    return this.http.delete(url).pipe(catchError(this.errorhandler));
  }
  errorhandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
