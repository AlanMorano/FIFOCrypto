import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MCreate} from '../../shared/models/m-create-model';
import {CreateService} from './create-account.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  isLoadShown = false;
  mCreate = new MCreate;
  constructor(
    private createSrv: CreateService,
    private router: Router
    ) {
    }

  ngOnInit() {
  }

  onSubmit(create: MCreate) {
    this.createSrv.createAccount(create).subscribe(res => {
      if (res.status === 'success') {
        this.router.navigate(['/user/dashboard']);
      }
    }, err => {
      console.log(err);
    });
  }

  loginLink() {
    this.router.navigate(['/login']);
  }

}
