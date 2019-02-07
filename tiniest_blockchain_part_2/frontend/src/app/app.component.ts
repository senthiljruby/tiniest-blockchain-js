import { Component } from '@angular/core';
import { UtilitiesService } from "./services/utilities.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  title = 'Tiniest Blockchain';

  constructor(
    private _utilitiesService: UtilitiesService
  ) {
    this.initializeUserId();
  }

  public initializeUserId(): any {
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', this._utilitiesService.generateRandomString(20));
    }
  }
}
