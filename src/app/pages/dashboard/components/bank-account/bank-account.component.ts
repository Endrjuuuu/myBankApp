import { Component } from '@angular/core';

@Component({
  selector: 'app-bank-account',
  standalone: true,
  imports: [],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.scss'
})
export class BankAccountComponent {
account ={
  name: 'Main account',
  balance: 10000,
  currency: 'PLN',
  status: 'inactive'
}
}
