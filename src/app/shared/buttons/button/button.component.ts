import { Component, Input } from '@angular/core';

export type ButtonType = 'button' | 'submit';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type: ButtonType = 'button';
}
