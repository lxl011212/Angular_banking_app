import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  standalone: false,
  template: `<button mat-raised-button [color]=\"color\">{{ label }}</button>`,
})
export class CustomButtonComponent {
  @Input() label: string = 'Submit';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
}

