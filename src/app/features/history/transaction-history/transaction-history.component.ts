import { Component, OnInit } from '@angular/core';
import { FirebaseDataService } from '../../../core/firebase-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule
  ]
})
export class TransactionHistoryComponent implements OnInit {
  accounts: { id: string; name: string }[] = [];
  selectedAccount: string = '';
  transactions: { [accountId: string]: any[] } = {};
  filteredTransactions: any[] = [];

  constructor(private firebaseService: FirebaseDataService) {}

  ngOnInit(): void {
    this.firebaseService.getAccounts().then(snapshot => {
      const data = snapshot.val();
      if (data) {
        this.accounts = Object.entries(data).map(([id, acc]: any) => ({ id, name: acc.name }));
      }
    });

    this.firebaseService.getAllTransfers().then(snapshot => {
      const data = snapshot.val();
      if (data) {
        this.transactions = data;
        this.updateFilteredTransactions();
      }
    });
  }

  updateFilteredTransactions() {
    if (this.selectedAccount && this.transactions[this.selectedAccount]) {
      this.filteredTransactions = Object.values(this.transactions[this.selectedAccount]).sort((a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      this.filteredTransactions = [];
    }
  }
}


