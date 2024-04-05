import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Job } from '../../store/list/list.models';

@Component({
  selector: 'app-job',
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
