import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Departamento } from '../models/departamento.model';
import { inputDepartamento } from '../models/inputDepartament.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VacacionesService {

  private apiUrl = 'http://localhost:3000/vacaciones';

constructor(private http: HttpClient) { }

getVacaciones(): Observable<any> {
  return this.http.get<any>(this.apiUrl);
}


}
