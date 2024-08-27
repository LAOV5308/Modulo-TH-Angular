import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Departamento } from '../models/departamento.model';
import { inputDepartamento } from '../models/inputDepartament.model';
import { catchError } from 'rxjs/operators';
import { Vacacion } from '../models/vacacion.model';

@Injectable({
  providedIn: 'root'
})
export class VacacionesService {

  private apiUrl = 'http://localhost:3000/vacaciones';

constructor(private http: HttpClient) { }


addVacacion(data: any):Observable<any>{
  return this.http.post(this.apiUrl, data);
}
getVacaciones(NoNomina: number | undefined): Observable<Vacacion[]> {
  return this.http.get<Vacacion[]>(this.apiUrl+'/'+NoNomina);
}
getVacacionesRango(data: any): Observable<any[]> {
  return this.http.post<any[]>(this.apiUrl+'/rango', data);
}

deleteVacacion(IdVacacion: number): Observable<any> {
  return this.http.delete(this.apiUrl+'/'+IdVacacion);
}



}
