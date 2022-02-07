import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, filter, mapTo } from 'rxjs';
import { AuthService } from 'src/app/core/data/auth/auth.service';
import { debug } from 'src/app/shared/utils/debug-operator';
import { EventObservable } from 'src/app/shared/utils/event-observable';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: []
})
export class LoginPageComponent implements OnInit {
  form = new FormGroup({
    username:new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.minLength(5)])
  });

  loginResult$ = new EventObservable<boolean>(true);
  success$ = this.loginResult$.pipe(filter(r => r));
  fail$ = this.loginResult$.pipe(filter(r => !r), mapTo(true), debug('Fail'));
  loading$ = new EventObservable<boolean>(true);

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.success$.subscribe(() => this.router.navigate(['/']))
  }

  login(){
    // gathers data
    if (!this.form.valid)
      return;
    const user = this.form.value.username;
    const password = this.form.value.password;

    // performs the login
    this.loading$.emit(true);
    this.authService.signIn(user, password).pipe(delay(1000)).subscribe(success => {
      this.loginResult$.emit(success);
      this.loading$.emit(false);
    });
  }

}
