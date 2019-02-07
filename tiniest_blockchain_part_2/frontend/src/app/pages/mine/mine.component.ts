import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss']
})

export class MineComponent implements OnInit {

  public userId: any;

  public rows = [];

  public columns = [
    { prop: 'from' },
    { name: 'to' },
    { name: 'amount' }
  ];

  constructor(
    private _apiService: ApiService,
    private _toastrService: ToastrService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getUserId();
    this.mineFromAddress();
  }

  mineFromAddress(): void {
    this._apiService.mineIt(this.userId).subscribe((data: any) => {
      this.rows = data;
      if (data.blockInfo) {
        this._toastrService.success(data.message, 'Tinest BlockChain!');
      } else {
        this._toastrService.error(data.message, 'Tinest BlockChain!');
      }
      console.log('Mining done successfully from your acccount');
      this._router.navigateByUrl('/');
    });
  }

  getUserId() {
    this.userId = localStorage.getItem('userId');
  }
}
