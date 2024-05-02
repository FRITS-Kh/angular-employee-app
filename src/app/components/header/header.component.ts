import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { User } from '@app/store/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() user: User | null = null;
  @Input() isAuthorized = false;
  @Input() isVerified = false;
  @Output() signOut = new EventEmitter<void>();

  constructor(private router: Router) {}

  onSignOut(): void {
    this.signOut.emit();
    this.router.navigate(['/static/welcome']);
  }

  onProfileNavigate(): void {
    const path = this.user?.uid ?? 'new';
    this.router.navigate(['/profile', path]);
  }
}
