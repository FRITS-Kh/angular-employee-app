import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Recruiter } from '../../../../store/user';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrl: './recruiter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecruiterComponent {
  @Input() role: Recruiter | null = null;
}
