import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {CommonModule} from '@angular/common';

interface Department {
  id: number;
  name: string;
  clinicId: number;
}

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ClinicComponent implements OnInit {
  clinicId!: number;
  clinicName: string = '';
  departments: Department[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clinicId = +params['id'];
      this.loadClinicName();
      this.loadDepartments();
    });
  }

  loadClinicName(){
    this.http.get<any>(`http://localhost:3000/api/clinics/single-clinic/${this.clinicId}`).subscribe((clinic) => {
      if (clinic){
        this.clinicName = clinic.name;
      }
    });
  }

  loadDepartments(){
    this.http.get<Department[]>(`http://localhost:3000/api/clinics/departments?clinicId=${this.clinicId}`).subscribe((departments) => {
      this.departments = departments;
    });
  }
}
