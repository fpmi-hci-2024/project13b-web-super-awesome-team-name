import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

interface Doctor {
  id: number;
  name: string;
  description: string;
  graduation: string;
  specialty: string;
}

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})

export class DoctorsComponent implements OnInit {
  departmentId!: number;
  doctors: Doctor[] = [];
  userRole: string | null = null;
  departmentName: string = '';
  cities: string[] = [];
  clinics: string[] = [];
  departments: string[] = [];
  selectedCity: string = '';
  selectedClinic: string = '';
  selectedDepartment: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('user_role');
    this.route.params.subscribe(params => {
      this.departmentId = +params['id'];
      console.log("DEPT ID: ", this.departmentId);
      this.loadDoctors();

      if (this.userRole === 'worker'){
        this.loadFilters();
      }
      this.loadDepartmentName();
    });
  }

  loadDoctors() {
    let url = 'http://localhost:3000/api/doctors';
    const params: any = {};

    if (this.userRole === 'client') {
      params.departmentId = this.departmentId;
    } else if (this.userRole === 'worker') {
      if (this.departmentId) {
        params.departmentId = this.departmentId;
      }
      if (this.selectedCity) {
        params.city = this.selectedCity;
      }
      if (this.selectedClinic) {
        params.clinic = this.selectedClinic;
      }
      if (this.selectedDepartment) {
        params.department = this.selectedDepartment;
      }
    }

    this.http.get<Doctor[]>(url, { params: params }).subscribe((doctors) => {
      this.doctors = doctors;
    });
  }

  loadDepartmentName() {
    this.http.get<any>(`http://localhost:3000/api/clinics/department/${this.departmentId}`).subscribe(department => {
      this.departmentName = department.name;
    });
    console.log("DEPT NAME: ", this.departmentName);
  }


  loadFilters() {
    this.http.get<string[]>('http://localhost:3000/api/doctors/cities').subscribe(cities => this.cities = cities);
    this.http.get<string[]>('http://localhost:3000/api/doctors/clinics').subscribe(clinics => this.clinics = clinics);
    this.http.get<string[]>('http://localhost:3000/api/doctors/departments').subscribe(departments => this.departments = departments);
  }

  goToDoctor(doctorId: number) {
    this.router.navigate(['/doctor', doctorId]);
  }
}
