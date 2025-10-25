import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BalancePipe } from '../../pipes/balance.pipe';
import { BankAccount } from '../../models/dashboard.models';

@Component({
  selector: 'app-bank-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BalancePipe],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.scss',
})
export class BankAccountComponent {
  @Input() account!: BankAccount;
  @Output() withdrawMoney$ = new EventEmitter<number>();

  form = new FormGroup({
    withdraw: new FormControl(0, {validators: [Validators.required, Validators.min(1), Validators.max(this.account.balance)]})}
  )

  get withdrawControl(): FormControl{
    return this.form.get('withdraw') as FormControl
  }

  get withdrawControlValue() : number{
    return this.withdrawControl.value;
  }
 
  withdrawMoney() {
    this.withdrawMoney$.next(this.withdrawControlValue);
    this.withdrawControl.setValue(null);
  }
}
