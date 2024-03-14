import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrl: './cropper.component.scss',
})
export class CropperComponent {
  @Input() imageFile!: File;
  @Output() changed = new EventEmitter<File>();

  croppedImage: Blob | null = null;

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.blob ?? null;
  }

  onCrop(): void {
    if (!this.croppedImage) {
      return;
    }

    this.changed.emit(
      new File([this.croppedImage], this.imageFile.name, {
        type: this.croppedImage.type,
      })
    );
  }
}
