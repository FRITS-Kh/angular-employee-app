import { FieldValue } from 'firebase/firestore';
import { Employee, Recruiter } from './roles';

export * from './roles';
export interface User {
  uid: string;
  name: string;
  photoUrl: string;
  email: string;
  isEmailVerified: boolean;
  country: string;
  about?: string;
  roleId: string;
  role: Employee | Recruiter | null;
  created: FieldValue;
  updated?: FieldValue;
}
