import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryAttributeOptionDialogComponent } from '../dialogs/category-attribute-option-dialog/category-attribute-option-dialog.component';
import { CategoryAttributedialogComponent } from '../dialogs/category-attributedialog/category-attributedialog.component';
import { CategorydialogComponent } from '../dialogs/categorydialog/categorydialog.component';
import { VMCategory } from '../viewmodels/VMCategory';
import { VMCategoryAttribute } from '../viewmodels/VMCategoryAttribute';
import { VMCategoryAttributeOption } from '../viewmodels/VMCategoryAttributeOption';

@Injectable({
  providedIn: 'root',
})
export class Dialogservice {
  constructor(private dialog: MatDialog) {}
  OpenCategoryDialog(data: VMCategory) {
    return this.dialog.open(CategorydialogComponent, {
      width: '35%',
      height: 'max-height',
      panelClass: 'custome-mat-card',
      disableClose: true,
      data: {
        Value: data,
      },
    });
  }
  OpenCategoryAttributeDialog(data: VMCategoryAttribute) {
    return this.dialog.open(CategoryAttributedialogComponent, {
      width: '35%',
      height: 'max-height',
      panelClass: 'custome-mat-card',
      disableClose: true,
      data: {
        Value: data,
      },
    });
  }
  OpenCategoryAttribOptionDialog(data: VMCategoryAttributeOption) {
    return this.dialog.open(CategoryAttributeOptionDialogComponent, {
      width: '35%',
      height: 'max-height',
      panelClass: 'custome-mat-card',
      disableClose: true,
      data: {
        Value: data,
      },
    });
  }
}
