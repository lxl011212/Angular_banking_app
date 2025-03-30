import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]]
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
    return !!from && amount <= from.balance;
  }

  onSubmit() {
    if (this.transferForm?.valid && this.isAmountValid()) {
      const { from, to, amount } = this.transferForm.value;
      console.log(`Transferred $${amount} from ${from} to ${to}`);

      this.fromAccount!.balance -= amount;
      const toAcc = this.accounts.find(acc => acc.id === to);
      if (toAcc) toAcc.balance += amount;

      this.transferForm.reset();
    }
  }
}
