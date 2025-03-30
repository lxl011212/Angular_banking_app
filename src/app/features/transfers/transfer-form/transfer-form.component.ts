import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseDataService } from '../../../core/firebase-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { maxTwoDecimals } from '../../../shared/validator/max-two-decimals.validator';


@Component({
  selector: 'app-transfer-form',
  standalone: false,
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent implements OnInit {
  transferForm!: FormGroup;

  accounts = [
    { id: 'acc1', name: 'Main Chequing', balance: 1000 },
    { id: 'acc2', name: 'Vacation Savings', balance: 500 },
  ];

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0), maxTwoDecimals]]
    });
    this.loadAccounts();
  }
  private loadAccounts() {
    this.firebaseService.getAccounts().then(snapshot => {
      const data = snapshot.val();
      this.accounts = data
        ? Object.entries(data).map(([id, acc]: any) => ({ id, ...acc }))
        : [];
    });
  }

  get amountControl() {
    return this.transferForm?.get('amount');
  }

  get fromValue() {
    return this.transferForm?.get('from')?.value;
  }

  get toValue() {
    return this.transferForm?.get('to')?.value;
  }

  get fromAccount() {
    const fromId = this.fromValue;
    return this.accounts.find(acc => acc.id === fromId);
  }

  isAmountValid(): boolean {
    const from = this.fromAccount;
    const amount = this.amountControl?.value;
    return !!from && amount <= from.balance && amount >= 0;
  }

  onSubmit() {
    if (!this.transferForm?.valid) {
      this.snackBar.open('Please fill out all fields correctly.', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar'
      });
      return;
    }
    
    if (this.fromValue === this.toValue) {
      this.snackBar.open('Cannot transfer to the same account.', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar'
      });
      return;
    }
    
    if (!this.isAmountValid()) {
      this.snackBar.open('Insufficient balance or invalid amount.', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar'
      });
      return;
    }
    
    const { from, to, amount } = this.transferForm.value;
    this.firebaseService.transferFunds(from, to, amount).then(() => {
      this.snackBar.open('Transfer successful!', 'Close', {
        duration: 3000,
        panelClass: 'success-snackbar'
      });
      this.transferForm.reset();
      this.transferForm.markAsPristine();
      this.transferForm.markAsUntouched();
      this.transferForm.updateValueAndValidity();
      Object.keys(this.transferForm.controls).forEach(key => {
        this.transferForm.get(key)?.setErrors(null);
      });
      this.loadAccounts();
    }).catch(err => {
      console.error(err);
      this.snackBar.open(err.message || 'Transfer failed', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar'
      });
    });
  }
}
