import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

interface Clinic {
  id: number;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-depts',
  templateUrl: './depts.component.html',
  styleUrls: ['./depts.component.css'],
  standalone: true,
  imports: [FormsModule, NgForOf, RouterLink]
})
export class DeptsComponent implements OnInit {
  clinics: Clinic[] = [];
  cities: string[] = [];
  selectedCity: string = '';

  constructor(private http: HttpClient, private router: Router) {}


  ngOnInit() {
    this.loadCities();
    this.loadClinics();
  }


  loadClinics() {
    let params = new HttpParams();
    if (this.selectedCity) {
      params = params.set('city', this.selectedCity);
    }

    this.http.get<Clinic[]>('http://localhost:3000/api/clinics/list', { params, responseType: 'json' }).subscribe(clinics => {
      this.clinics = clinics;
    });
  }

  loadCities() {
    this.http.get<string[]>('http://localhost:3000/api/clinics/cities').subscribe(cities => {
      this.cities = cities;
    });
  }

  goToClinic(id: number) {
    this.router.navigate(['/clinic', id]);
  }
}
