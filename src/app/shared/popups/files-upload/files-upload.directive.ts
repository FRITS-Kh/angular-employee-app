import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { FilesUploadComponent } from './files-upload.component';

@Directive({
  selector: '[appFilesUpload]',
})
export class FilesUploadDirective {
  @Input() multiple = false;
  @Input() crop = false;
  @Output() changed = new EventEmitter<string | string[]>();

  constructor(private dialog: MatDialog) {}

  @HostListener('click', ['$event']) onClick() {
    this.openDialog();
  }

  private openDialog(): void {
    const dialogRef: MatDialogRef<FilesUploadComponent, string | string[]> =
      this.dialog.open(FilesUploadComponent, {
        width: '550px',
        height: '500px',
        data: {
          multiple: this.multiple,
          crop: this.crop,
        },
      });

    dialogRef.afterClosed().subscribe((result) => {
      this.changed.emit(result);
    });
  }
}
