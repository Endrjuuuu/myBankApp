import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BalancePipe } from '../../pipes/balance.pipe';
import { BankAccount } from '../../models/dashboard.models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bank-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BalancePipe],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.scss',
})
export class BankAccountComponent implements OnInit, OnDestroy {
  @Input() account!: BankAccount;
  @Output() withdrawMoney$ = new EventEmitter<number>();

  destroy$ = new Subject<void>();
  form!: FormGroup;
  showWithdrawWarning = false;

  get withdrawControl(): FormControl {
    return this.form.get('withdraw') as FormControl;
  }

  get withdrawControlValue(): number {
    return this.withdrawControl.value;
  }

  get balance(): number {
    return this.account.balance;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      withdraw: new FormControl(0, {
        validators: [
          Validators.required,
          Validators.min(1),
          Validators.max(this.account?.balance),
        ],
      }),
    });

    this.withdrawControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.showWithdrawWarning = value >= 1000;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  withdrawMoney() {
    this.withdrawMoney$.next(this.withdrawControlValue);
    this.withdrawControl.setValue(null);
  }
}
