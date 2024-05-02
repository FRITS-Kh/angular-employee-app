import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  Storage,
  ref,
  uploadBytesResumable,
  UploadTask,
  UploadTaskSnapshot,
  getDownloadURL,
  percentage,
} from '@angular/fire/storage';
import { Observable, Subject, finalize, map, take, takeUntil } from 'rxjs';

import { FileSizePipe } from '../../pipes';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FileSizePipe],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input() file!: File;
  @Output() complete = new EventEmitter<string>();

  task!: UploadTask;
  percentage$!: Observable<number>;
  snapshot$!: Observable<UploadTaskSnapshot | undefined>;
  downloadURL!: string;
  private destroy = new Subject<void>();

  constructor(private storage: Storage, private auth: Auth) {}

  ngOnInit(): void {
    authState(this.auth)
      .pipe(take(1), takeUntil(this.destroy))
      .subscribe((user) => this.startUpload(user?.uid ?? ''));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  startUpload(id = ''): void {
    const path = `${this.file.type.split('/')[0]}/${
      id !== '' ? id : Date.now()
    }_${this.file.name}`;

    const storageRef = ref(this.storage, path);

    this.task = uploadBytesResumable(storageRef, this.file);
    this.snapshot$ = percentage(this.task).pipe(map((item) => item.snapshot));
    this.snapshot$
      .pipe(
        takeUntil(this.destroy),
        finalize(async () => {
          this.downloadURL = await getDownloadURL(storageRef);
          this.complete.next(this.downloadURL);
        })
      )
      .subscribe();
  }
}
