import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Check, StepperService } from './services';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  constructor(private stepper: StepperService) {}

  ngOnInit(): void {
    this.stepper.next$
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.stepper.onNext());
  }

  get steps() {
    return this.stepper.steps;
  }

  get activeStep() {
    return this.stepper.activeStep;
  }

  isActive(index: number): boolean {
    return index === this.activeStep.index;
  }

  isCompleted(index: number): boolean {
    return index < this.activeStep.index;
  }

  isFirst(): boolean {
    return this.activeStep.index === 0;
  }

  isLast(): boolean {
    return this.activeStep.index === this.steps.length - 1;
  }

  onNext(): void {
    this.stepper.check.next(Check.Next);
  }

  onPrev(): void {
    this.stepper.onPrev();
  }

  onComplete(): void {
    this.stepper.check.next(Check.Complete);
  }

  onCancel(): void {
    this.stepper.cancel.next();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
