import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { RequestService } from '../shared/services/request.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [RequestService],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  loginFail: boolean;
  email = '';
  password = '';
  constructor(private  api: RequestService,
              private router: Router) {}

  ngOnInit() {}

  onLoggedin() {
      localStorage.setItem('isLoggedin', 'true');
  }
  onSubmit() {
    // this.api.getUser({email: this.email, password: this.password}).subscribe(data => {
    //   if (data['success']) {
        localStorage.setItem('isLoggedin', 'true');
        // localStorage.setItem('user', data['user'].username);
        this.router.navigate(['/person']);
    //   } else {
    //     this.loginFail = true;
    //   }
    // });
  }
}
