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
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

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
        this.loginForm.value.password === 'admin'
      ) {
        console.log('Login successful');
      } else {
        console.log('Invalid credentials');
      }
    }
  }

  onReset(): void {
    this.loginForm.reset();
  }
}
