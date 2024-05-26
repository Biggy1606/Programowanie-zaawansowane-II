import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError = false;
  loginSuccess = false; // Add this line

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      const isLoggedIn = this.authService.login(username, password);
      if (isLoggedIn) {
        console.log('Login successful');
        this.loginSuccess = true;
        this.loginError = false;
        this.router.navigate(['/dashboard']);
      } else {
        console.log('Invalid credentials');
        this.loginError = true;
        this.loginSuccess = false;
      }
    }
  }

  onReset(): void {
    this.loginForm.reset();
    this.loginError = false;
    this.loginSuccess = false;
  }
}
