import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Job } from '../../store/list/list.models';
import { ButtonComponent } from '@app/shared';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobComponent {
  @Input() item: Job | null = null;
  @Input() isEditable = false;

  @Output() edit = new EventEmitter<Job>();
  @Output() delete = new EventEmitter<string>();

  onEdit(job: Job): void {
    this.edit.emit(job);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }
}
