import { FieldValue } from '@angular/fire/firestore';

export interface Job {
  title: string;
  salary: number;
  created: FieldValue;
  updated?: FieldValue;
}
