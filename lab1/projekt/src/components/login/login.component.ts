import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  loginError = false;
  loginSuccess = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Data:', this.loginForm.value);
      // Add your login logic here
      if (
        this.loginForm.value.username === 'admin' &&
        this.loginForm.value.password === 'password'
      ) {
        console.log('Login successful');
        this.loginSuccess = true;
        this.loginError = false;
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
