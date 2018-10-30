import { Component, OnInit, enableProdMode, isDevMode } from '@angular/core';
import {environment} from '../environments/environment';
import {Router} from '@angular/router';
import 'hammerjs';

environment.production = true;
enableProdMode();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dex-ether';
  constructor(
    private router: Router) {
  }

  ngOnInit() {
  }
}
