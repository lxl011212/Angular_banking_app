import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [TransactionHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule
  ]
})
export class HistoryModule {}
