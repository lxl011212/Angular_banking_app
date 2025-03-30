import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseDataService } from '../../../core/firebase-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { maxTwoDecimals } from '../../../shared/validator/max-two-decimals.validator';


@Component({
  selector: 'app-account-form',
  standalone: false,
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {
  accountForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      balance: [0, [Validators.required, Validators.min(0), maxTwoDecimals]],
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
      const accountData = this.accountForm.value;
  
      // Check for duplicate account name
      this.firebaseService.getAccountNames().then(names => {
        if (names.includes(accountData.name.toLowerCase())) {
          this.snackBar.open('Account name already exists!', 'Close', {
            duration: 3000,
            panelClass: 'error-snackbar'
          });
          return;
        }
  
        this.firebaseService.createAccount(accountData).then(() => {
          this.snackBar.open('Account created successfully!', 'Close', {
            duration: 3000,
            panelClass: 'success-snackbar'
          });
  
          this.accountForm.reset({
            name: '',
            balance: null,
            type: ''
          });
          this.accountForm.markAsPristine();
          this.accountForm.markAsUntouched();
          this.accountForm.updateValueAndValidity();
          Object.keys(this.accountForm.controls).forEach(key => {
            this.accountForm.get(key)?.setErrors(null);
          });
        });
      });
    }
  }
  
}
  