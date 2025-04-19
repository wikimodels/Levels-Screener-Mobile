import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-firebase.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.userData$.subscribe((data) => {
      console.log('Is authenticated:', data);
    });
  }
  login() {
    this.authService.signInWithGoogle().subscribe();
  }

  logout() {
    this.authService.logout();
  }
}
