import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountFormComponent } from './features/accounts/account-form/account-form.component';
import { TransferFormComponent } from './features/transfers/transfer-form/transfer-form.component';
import { TransactionHistoryComponent } from './features/history/transaction-history/transaction-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
  { path: 'accounts', component: AccountFormComponent },
  { path: 'transfers', component: TransferFormComponent },
  { path: 'history', component: TransactionHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

