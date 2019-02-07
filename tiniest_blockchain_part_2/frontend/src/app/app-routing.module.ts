import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { CreateTransactionComponent } from './pages/create-transaction/create-transaction.component';
import { MineComponent } from './pages/mine/mine.component';

import { NotfoundComponent } from './errors/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'transaction-history', component: TransactionHistoryComponent },
  { path: 'create-transaction', component: CreateTransactionComponent },
  { path: 'mine', component: MineComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
