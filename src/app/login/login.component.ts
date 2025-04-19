import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core'; // Import NgZone
import { AuthService } from 'src/app/login/service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.subscription.add(
      this.authService.userData$.subscribe((data) => {
        console.log('User data:', data);
      })
    );
  }
  login() {
    this.authService.signInWithGoogle().subscribe();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
