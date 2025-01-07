import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterModule, NgIf]
})
export class HeaderComponent implements OnInit {
  userRole: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('user_role');
  }

  logout() {
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');
    this.router.navigate(['/login']);
  }
}
