import { Injectable } from '@angular/core';
import { Database, ref, get, update, child, push, set } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class FirebaseDataService {
  constructor(private db: Database) {}

  createAccount(account: { name: string; balance: number; type: string }) {
    const accountRef = ref(this.db, 'accounts');
    const newAccountRef = push(accountRef);
    return set(newAccountRef, account);
  }

  getAccounts() {
    return get(child(ref(this.db), 'accounts'));
  }

  getAccountNames(): Promise<string[]> {
    return get(child(ref(this.db), 'accounts')).then(snapshot => {
      const data = snapshot.val();
      return data
        ? Object.values(data).map((acc: any) => acc.name.toLowerCase())
        : [];
    });
  }
  
  async transferFunds(fromId: string, toId: string, amount: number) {
    const dbRef = ref(this.db);

    const snapshot = await get(child(dbRef, 'accounts'));
    const accounts = snapshot.val();

    if (!accounts || !accounts[fromId] || !accounts[toId]) {
      throw new Error('Invalid account(s)');
    }

    const from = accounts[fromId];
    const to = accounts[toId];

    if (amount <= 0) throw new Error('Amount must be positive');
    if (from.balance < amount) throw new Error('Insufficient funds');

    const updates: any = {};

    // Update balances
    updates[`accounts/${fromId}/balance`] = from.balance - amount;
    updates[`accounts/${toId}/balance`] = to.balance + amount;

    // Record transfer under each account
    const transfer = {
      from: from.name,
      to: to.name,
      amount,
      date: new Date().toISOString()
    };
    const transferKeyFrom = push(child(ref(this.db), `transfers/${fromId}`)).key!;
    const transferKeyTo = push(child(ref(this.db), `transfers/${toId}`)).key!;

    updates[`transfers/${fromId}/${transferKeyFrom}`] = { ...transfer, type: 'sent' };
    updates[`transfers/${toId}/${transferKeyTo}`] = { ...transfer, type: 'received' };

    await update(dbRef, updates);
  }
  getAllTransfers() {
    return get(child(ref(this.db), 'transfers'));
  }

}
