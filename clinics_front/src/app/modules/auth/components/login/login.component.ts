import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf]
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:3000/api/auth/plus-vibe-login', this.loginForm.value).subscribe(
        (response: any) => {
          localStorage.setItem('user_id', response.id);
          localStorage.setItem('user_role', response.role);
          if (response.role === 'client') {
            this.router.navigate(['/home'])
          } else if (response.role === 'worker') {
            this.router.navigate(['/depts'])
          }
        },
        (error) => {
          console.error('Login error:', error);
          this.error = 'Incorrect username or password';
        }
      );
    }
  }
}
