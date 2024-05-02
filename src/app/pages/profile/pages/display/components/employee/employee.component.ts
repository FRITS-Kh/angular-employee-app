import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Employee } from '../../../../store/user';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
  @Input() role: Employee | null = null;
}
