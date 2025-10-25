import { Component, OnInit } from '@angular/core';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { CommonModule } from '@angular/common';
import { BankAccountHttpService } from './services/bank-account-http.service';
import { BankAccount } from './models/dashboard.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [BankAccountHttpService],
  imports: [CommonModule, BankAccountComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  accounts: BankAccount[] = [];

  constructor(private bankAccountHttpService: BankAccountHttpService) {}

  ngOnInit(): void {
    this.bankAccountHttpService
      .getBankAccounts()
      .subscribe((accounts) => (this.accounts = accounts));
  }

  onWithdrawMoney(accountId: number, withdrawAmount: number) {
    this.bankAccountHttpService.withdrawMoney(accountId, withdrawAmount);
  }
}
