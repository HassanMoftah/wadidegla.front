import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VMCategory } from '../viewmodels/VMCategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = environment.backend + 'Category/';
  constructor(private http: HttpClient) {}
  GetAllOfParent(id: number) {
    let url = this.apiUrl + 'GetAllOfParent?id=' + id;
    return this.http.get<VMCategory[]>(url).pipe(catchError(this.errorhandler));
  }
  Get(id: number) {
    let url = this.apiUrl + 'Get?id=' + id;
    return this.http.get<VMCategory>(url).pipe(catchError(this.errorhandler));
  }
  GetAllFirstParents() {
    let url = this.apiUrl + 'GetAllFirstParents';
    return this.http.get<VMCategory[]>(url).pipe(catchError(this.errorhandler));
  }
  Add(category: VMCategory) {
    let url = this.apiUrl + 'Add';
    return this.http
      .post<VMCategory>(url, category)
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
