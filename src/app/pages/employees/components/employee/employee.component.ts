import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { UserPhotoComponent } from '@app/shared';
import { User } from '../../store/list/list.models';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, UserPhotoComponent, RouterLink],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
  @Input() employee: User | null = null;
}
