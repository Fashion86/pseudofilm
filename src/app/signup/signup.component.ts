import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { User } from '../models/user';
import { RequestService } from '../shared/services/request.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [RequestService],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    newuser: User;
    checkpasswd: string;
    error: boolean;
    errormsg = '';
  constructor(private  api: RequestService,
              private router: Router) {}

  ngOnInit() {
    this.newuser = new User();
    this.error = false;
  }
  onSubmit() {
    if (this.newuser.password !== this.checkpasswd) {
        this.error = true;
        this.errormsg = 'Password incorrect!';
    } else {
        this.error = false;
        this.api.addUser(this.newuser).subscribe(data => {
          this.router.navigate(['/login']);
          this.error = false;
      }, err => {
          this.error = true;
          this.errormsg = 'Register Failed!';
        });
    }
  }
}
