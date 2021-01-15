import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VMCategoryAttributeOption } from '../viewmodels/VMCategoryAttributeOption';

@Injectable({
  providedIn: 'root',
})
export class CategoryAttributeOptionService {
  apiUrl = environment.backend + 'CategoryAttributeOption/';
  constructor(private http: HttpClient) {}
  GetAllOfCategoryAttribute(id: number) {
    let url = this.apiUrl + 'GetAllOfCategoryAttribute?id=' + id;
    return this.http.get<VMCategoryAttributeOption[]>(url).pipe(catchError(this.errorhandler));
  }

  Add(categoryattOption: VMCategoryAttributeOption) {
    let url = this.apiUrl + 'Add';
    return this.http
      .post<VMCategoryAttributeOption>(url, categoryattOption)
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
