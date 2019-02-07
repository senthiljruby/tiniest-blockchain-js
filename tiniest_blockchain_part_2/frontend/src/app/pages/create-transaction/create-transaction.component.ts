import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

  public transaction: any = { from: '', to: '', amount: '' };
  public userId: any;

  constructor(
    private _apiService: ApiService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  getUserId() {
    this.transaction.from = localStorage.getItem('userId');
  }

  createTransaction() {
    this._apiService.createTransaction(this.transaction).subscribe((data: any) => {
      this._toastrService.success(data.message, 'Tinest BlockChain!');
      console.log('Transaction Created');
    });
  }
}
