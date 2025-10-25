import { Component } from '@angular/core';
import { BankAccountComponent } from './components/bank-account/bank-account.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BankAccountComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
