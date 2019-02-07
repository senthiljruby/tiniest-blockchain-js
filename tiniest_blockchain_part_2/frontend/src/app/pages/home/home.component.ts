import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public userBalance: any;
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
    this.getUserId();
    this.getUserDetails();
  }

  getUserId() {
    this.userId = localStorage.getItem('userId');
  }

  getUserDetails(): void {
    this._apiService.getUserBalance(this.userId).subscribe((data: any) => {
      this.userBalance = data;
      this.rows = data.userTransactions;
    });
  }
}
