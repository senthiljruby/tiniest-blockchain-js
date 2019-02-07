import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { CreateTransactionComponent } from './pages/create-transaction/create-transaction.component';
import { UserBalanceComponent } from './common/user-balance/user-balance.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './errors/notfound/notfound.component';
import { MineComponent } from './pages/mine/mine.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TransactionHistoryComponent,
    CreateTransactionComponent,
    UserBalanceComponent,
    HomeComponent,
    NotfoundComponent,
    MineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    
    CollapseModule.forRoot(), 
    BsDropdownModule.forRoot(),
    NgxDatatableModule,
    ToastrModule.forRoot(),
    
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
