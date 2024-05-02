import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-user-photo',
  standalone: true,
  templateUrl: './user-photo.component.html',
  styleUrl: './user-photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPhotoComponent {
  @Input() photoUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  get safePhotoUrl(): SafeStyle {
    return this.photoUrl
      ? this.sanitizer.bypassSecurityTrustStyle(`url(${this.photoUrl})`)
      : '';
  }
}
