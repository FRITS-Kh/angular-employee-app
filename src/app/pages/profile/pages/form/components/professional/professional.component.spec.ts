import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalComponent } from './professional.component';
import { StepperService } from '../stepper/services';

describe('ProfessionalComponent', () => {
  let component: ProfessionalComponent;
  let fixture: ComponentFixture<ProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [StepperService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
