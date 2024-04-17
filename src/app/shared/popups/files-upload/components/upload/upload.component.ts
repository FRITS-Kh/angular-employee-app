import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import {
  Observable,
  Subject,
  finalize,
  lastValueFrom,
  take,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input() file!: File;
  @Output() complete = new EventEmitter<string>();

  task!: AngularFireUploadTask;
  percentage$!: Observable<number>;
  snapshot$!: Observable<UploadTaskSnapshot | undefined>;
  downloadURL!: string;
  private destroy = new Subject<void>();

  constructor(
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.afAuth.authState
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
    const storageRef = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);
    this.snapshot$ = this.task.snapshotChanges();
    this.snapshot$
      .pipe(
        takeUntil(this.destroy),
        finalize(async () => {
          this.downloadURL = await lastValueFrom(storageRef.getDownloadURL());
          this.complete.next(this.downloadURL);
        })
      )
      .subscribe();
  }
}
