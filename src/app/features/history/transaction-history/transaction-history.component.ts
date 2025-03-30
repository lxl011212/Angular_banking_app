import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-history',
  standalone: false,
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent {
  selectedAccount: string = '';
  accounts = ['Main Chequing', 'Vacation Savings'];

  transactions = [
    { account: 'Main Chequing', type: 'Transfer Out', amount: 100, to: 'Vacation Savings', date: new Date() },
    { account: 'Vacation Savings', type: 'Transfer In', amount: 100, from: 'Main Chequing', date: new Date() }
  ];

  get filteredTransactions() {
    return this.transactions.filter(tx => tx.account === this.selectedAccount);
  }
}

