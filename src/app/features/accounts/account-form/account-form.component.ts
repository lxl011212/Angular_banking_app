import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-form',
  standalone: false,
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {
  accountForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      balance: [0, [Validators.required, Validators.min(1)]],
      type: ['', Validators.required]
    });
  }

  get accountType(): string {
    return this.accountForm?.get('type')?.value;
  }

  get nameControl() {
    return this.accountForm?.get('name');
  }

  get balanceControl() {
    return this.accountForm?.get('balance');
  }

  onSubmit(): void {
    if (this.accountForm?.valid) {
      console.log('Account Created:', this.accountForm.value);
      this.accountForm.reset();
    }
  }
}
