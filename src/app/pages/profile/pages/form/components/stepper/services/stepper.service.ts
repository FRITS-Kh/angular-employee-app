import { Injectable } from '@angular/core';
import { Subject, filter } from 'rxjs';

export interface Step {
  key: string;
  label: string;
}

export interface ActiveStep extends Step {
  index: number;
}

export enum Check {
  Next = 'next',
  Complete = 'complete',
}

@Injectable()
export class StepperService {
  steps: Step[] = [];
  activeStep!: ActiveStep;

  next = new Subject<boolean>();
  next$ = this.next.asObservable().pipe(filter((isValid) => isValid));

  prev = new Subject<void>();
  prev$ = this.prev.asObservable();

  complete = new Subject<boolean>();
  complete$ = this.complete.asObservable().pipe(filter((isValid) => isValid));

  cancel = new Subject<void>();
  cancel$ = this.cancel.asObservable();

  check = new Subject<Check>();
  check$ = this.check.asObservable();

  init(steps: Step[]): void {
    this.steps = steps;
    this.activeStep = { ...steps[0], index: 0 };
  }

  onNext(): void {
    const index = this.activeStep.index + 1;

    this.activeStep = { ...this.steps[index], index };
  }

  onPrev(): void {
    const index = this.activeStep.index - 1;

    this.activeStep = { ...this.steps[index], index };
  }
}
