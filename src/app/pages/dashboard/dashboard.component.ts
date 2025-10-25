import { Component } from '@angular/core';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { CommonModule } from '@angular/common';
import { BankAccountHttpService } from './services/bank-account-http.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [BankAccountHttpService],
  imports: [CommonModule, BankAccountComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  accounts$ = this.bankAccountHttpService.getBankAccounts();

  constructor(private bankAccountHttpService: BankAccountHttpService) {}

  onWithdrawMoney(accountId: number, withdrawAmount: number) {
    this.bankAccountHttpService.withdrawMoney(accountId, withdrawAmount);
  }
}
