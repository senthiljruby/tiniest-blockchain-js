import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private url = "/api/v1";

  constructor(
    private http: HttpClient
  ) { }

  getUserBalance(network: string): Observable<any> {
    const url = `${this.url}/balance/${network}`;
    return this.http.get<any>(url);
  }

  createTransaction(params: any): Observable<any> {
    const url = `${this.url}/transaction`;
    return this.http.post<any>(url, params);
  }

  getTransactions(): Observable<any> {
    const url = `${this.url}/transactions`;
    return this.http.get<any>(url);
  }

  mineIt(mineNetwork: string): Observable<any> {
    const url = `${this.url}/mine/${mineNetwork}`;
    return this.http.get<any>(url);
  }
}
