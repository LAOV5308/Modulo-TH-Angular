import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Departamento } from '../models/departamento.model';
import { inputDepartamento } from '../models/inputDepartament.model';
import { catchError } from 'rxjs/operators';
import { FechaVacacion, Vacacion } from '../models/vacacion.model';

@Injectable({
  providedIn: 'root'
})
export class VacacionesService {

  private apiUrl = 'http://localhost:3000/vacaciones';

constructor(private http: HttpClient) { }


addVacacion(data: any):Observable<any>{
  return this.http.post(this.apiUrl, data);
}

getFechasVacaciones(NoNomina: number | undefined): Observable<FechaVacacion[]> {
  return this.http.get<FechaVacacion[]>(this.apiUrl+'/'+NoNomina);
}

getVacacionesPeriodo(NoNomina: number | undefined): Observable<Vacacion[]> {
  const body = {
    NoNomina: NoNomina
  };
  return this.http.post<Vacacion[]>(`${this.apiUrl}/periodos`, body);
}

getVacaciones(NoNomina: number | undefined, Periodo: string): Observable<Vacacion[]> {
  const body = {
    NoNomina: NoNomina,
    Periodo: Periodo
  };
  return this.http.post<Vacacion[]>(`${this.apiUrl}/all`, body);
}
updateDiasVacaciones(IdVacacion: number, DiasDisponibles: number, DiasUtilizados: number ): Observable<any> {
  const body = {
    DiasDisponibles: DiasDisponibles,
    DiasUtilizados: DiasUtilizados
  };
  return this.http.put(this.apiUrl+'/'+IdVacacion, body);
}
incrementarDiasVacaciones(IdVacacion: number): Observable<any> {
  const body = {
    IdVacacion: IdVacacion
  };
  return this.http.post(this.apiUrl+'/increase', body);
}


/**return this.http.put(this.apiUrl+'/'+IdPuesto, data) */


getVacacionesRango(data: any): Observable<any[]> {
  return this.http.post<any[]>(this.apiUrl+'/rango', data);
}

deleteVacacion(IdVacacion: number): Observable<any> {
  return this.http.delete(this.apiUrl+'/'+IdVacacion);
}

}
