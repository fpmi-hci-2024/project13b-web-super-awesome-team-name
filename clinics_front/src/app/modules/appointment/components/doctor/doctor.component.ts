import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

interface Appointment {
  id: number;
  doctorId: number;
  userId: number;
  date: string;
  time: string;
  patientName?: string;
}

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})

export class DoctorComponent implements OnInit {
  doctorId!: number;
  selectedDate: string = '';
  appointments: Appointment[] = [];
  userId: number | null = null;
  userRole: string | null = null;
  newAppointmentTime: string = '';
  newAppointmentName: string = '';
  availableTimes: string[] = [];
  minDate: string = new Date().toISOString().split('T')[0];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('user_id'));
    this.userRole = localStorage.getItem('user_role');
    this.route.params.subscribe(params => {
      this.doctorId = +params['id'];
      if (this.selectedDate) {
        this.loadAppointments();
        this.generateAvailableTimes();
      }
    });
  }

  onDateChange() {
    this.loadAppointments();
    this.generateAvailableTimes();
  }

  loadAppointments() {
    if (!this.selectedDate) return;
    this.http.get<Appointment[]>(`http://localhost:3000/api/appointments`, {params: {doctorId: this.doctorId, date: this.selectedDate}})
      .subscribe(appointments => {
        this.appointments = appointments;
      });
  }

  removeAppointment(appointmentId: number) {
    this.http.delete(`http://localhost:3000/api/appointments/${appointmentId}`)
      .subscribe(() => {
        this.loadAppointments();
      });
  }

  generateAvailableTimes() {
    if (!this.selectedDate) {
      this.availableTimes = [];
      return;
    }

    const times: string[] = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(time);
      }
    }

    this.http.get<string[]>(`http://localhost:3000/api/appointments/available_times`, {
      params: { doctorId: this.doctorId, date: this.selectedDate }
    }).subscribe((takenTimes) => {

      this.availableTimes = times.filter(time => !takenTimes.includes(time));
      if (!this.availableTimes.includes(this.newAppointmentTime)){
        this.newAppointmentTime = this.availableTimes[0];
      }

    });
  }

  createAppointment() {
    const newAppointment = {
      doctorId: this.doctorId,
      userId: this.userId,
      date: this.selectedDate,
      time: this.newAppointmentTime,
      patientName: this.newAppointmentName
    };

    this.http.post(`http://localhost:3000/api/appointments`, newAppointment)
      .subscribe(() => {
        this.newAppointmentName = '';
        this.newAppointmentTime = ''; // reset time
        this.loadAppointments();
        this.generateAvailableTimes();
      });
  }
}
