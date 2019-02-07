import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})

export class TransactionHistoryComponent implements OnInit {
  public userId: any;

  public rows = [];

  public columns = [
    { prop: 'from' },
    { name: 'to' },
    { name: 'amount' }
  ];

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(): void {
    this._apiService.getTransactions().subscribe((data: any) => {
      this.rows = data;
    });
  }
}
