import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Departamento } from '../models/departamento.model';
import { inputDepartamento } from '../models/inputDepartament.model';
import { catchError } from 'rxjs/operators';
import { FechaVacacion, Vacacion, DiasDisponibles } from '../models/vacacion.model';
import { Peticion } from './Service';
@Injectable({
  providedIn: 'root'
})
export class VacacionesService {

  //private apiUrl = 'http://localhost:3000/vacaciones';
  private apiUrl = Peticion.apiUrl+'vacaciones';
  //private apiUrl ='https://all-keys-sip.loca.lt/vacaciones'

constructor(private http: HttpClient) { }


addVacacion(data: any):Observable<any>{
  return this.http.post(this.apiUrl, data);
}

getFechasVacaciones(NoNomina: number | undefined): Observable<FechaVacacion[]> {
  return this.http.get<FechaVacacion[]>(this.apiUrl+'/'+NoNomina);
}


//Traer las fechas por Periodo y NoNomina
getFechasVacacionesPerido(NoNomina: number | undefined, Periodo: string): Observable<FechaVacacion[]> {
  const body = {
    NoNomina: NoNomina,
    Periodo: Periodo
  }
  return this.http.post<FechaVacacion[]>(this.apiUrl+'/fechasvacacionesperiodo', body);
}

//Traer las fechas por Periodo y NoNomina
getVacacionesPorPeriodo(NoNomina: number | undefined, Periodo: string): Observable<Vacacion[]> {
  const body = {
    NoNomina: NoNomina,
    Periodo: Periodo
  }
  return this.http.post<Vacacion[]>(this.apiUrl+'/vacacionesperiodo', body);
}





getVacacionesPeriodo(NoNomina: number | undefined): Observable<Vacacion[]> {
  const body = {
    NoNomina: NoNomina
  };
  return this.http.post<Vacacion[]>(`${this.apiUrl}/periodos`, body);
}

getDiasVacaciones(NoNomina: number | undefined):Observable<DiasDisponibles[]>{
  const body = {
    NoNomina: NoNomina
  };

  return this.http.post<DiasDisponibles[]>(this.apiUrl+'/diasvacaciones', body);
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
