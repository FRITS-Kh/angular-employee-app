import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from '../../store/list/list.models';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
  @Input() employee: User | null = null;
}
