import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { CommonModule } from '@angular/common';
import { BankAccountHttpService } from './services/bank-account-http.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [BankAccountHttpService],
  imports: [CommonModule, BankAccountComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly bankAccountHttpService = inject(BankAccountHttpService);
  accounts$ = combineLatest([
    this.bankAccountHttpService.getBankAccounts(),
    this.bankAccountHttpService.getVisibleAccounts(),
  ]).pipe(
    map(([accounts, visible]) =>
      accounts.filter((account) => visible.includes(account.id)),
    ),
  );

  onWithdrawMoney(accountId: number, withdrawAmount: number) {
    this.bankAccountHttpService.withdrawMoney(accountId, withdrawAmount);
  }
}
