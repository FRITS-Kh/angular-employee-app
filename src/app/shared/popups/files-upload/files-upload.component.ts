import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  multiple: boolean;
  crop: boolean;
}

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrl: './files-upload.component.scss',
})
export class FilesUploadComponent {
  isHovering = false;
  files: File[] = [];
  filesURLs: string[] = [];
  imageFile: File | null = null;
  isError = false;

  constructor(
    private dialogRef: MatDialogRef<FilesUploadComponent, string | string[]>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  onDrop(data: FileList | EventTarget): void {
    const files =
      data instanceof FileList ? data : (data as HTMLInputElement).files;
    this.isError = false;

    if (!files || (this.data.crop && files.length > 1)) {
      this.isError = true;

      return;
    }

    if (
      this.data.crop &&
      files.length === 1 &&
      files.item(0)?.type.split('/')[0] === 'image'
    ) {
      this.imageFile = files.item(0);

      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);

      if (file) {
        this.files.push(file);
      }
    }

    console.log(files);
  }

  onCrop(file: File) {
    this.imageFile = null;
    this.files.push(file);
  }

  onUploadComplete(url: string): void {
    this.filesURLs.push(url);
  }

  onComplete(): void {
    const result = this.data.multiple ? this.filesURLs : this.filesURLs[0];
    this.dialogRef.close(result);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
