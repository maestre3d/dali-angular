import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.html',
})

export class DialogComponent {

    constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

      onOkClick(): void {
        this.data.flag = true;
        this.dialogRef.close();
      }

    onNoClick(): void {
        this.data.flag = false;
        this.dialogRef.close();
    }
}
