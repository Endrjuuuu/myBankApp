import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  inject,
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
import { CardStatusDirective } from '../../../../shared/directives/card-status.directive';

@Component({
  selector: 'app-bank-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BalancePipe,
    CardStatusDirective,
  ],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankAccountComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @ContentChild('deleteButton') deleteButton!: ElementRef;
  @Input() account!: BankAccount;
  @Output() withdrawMoney$ = new EventEmitter<number>();

  cdr = inject(ChangeDetectorRef);

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

  ngAfterContentInit(): void {
    if (this.account.status === 'inactive') {
      this.deleteButton.nativeElement.disabled = true;
    }
  }

  withdrawMoney() {
    this.withdrawMoney$.next(this.withdrawControlValue);
    this.withdrawControl.setValue(null);
    this.form.reset();
    this.cdr.detectChanges();
  }
}
