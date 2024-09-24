import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Departamento } from '../models/departamento.model';
import { inputDepartamento } from '../models/inputDepartament.model';
import { catchError } from 'rxjs/operators';


import { CapacitacionProgramada, CapacitacionesSuscripciones, Calificaciones, Capacitacion, CapacitacionesEmpleado } from '../models/capacitacion.model';
import { Peticion } from './Service';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {

  
  private apiUrl = Peticion.apiUrl+'capacitaciones';
  //private apiUrl ='https://all-keys-sip.loca.lt/capacitaciones'
  //private apiUrl = 'https://2vbqt1w4-3000.usw3.devtunnels.ms/capacitaciones';

  constructor(private http: HttpClient) { }

  addCapacitacion(data: any):Observable<any>{
    return this.http.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  getCapacitaciones(): Observable<Capacitacion[]> {
    return this.http.get<Capacitacion[]>(this.apiUrl);
  }
  
  addCapacitacionRango(IdProgramacionCapacitacion:number | null, FechaInicio: Date, FechaFin: Date, Horas:number):Observable<any>{
    const body = {
      IdProgramacionCapacitacion: IdProgramacionCapacitacion,
      FechaInicio: FechaInicio,
      FechaFin: FechaFin,
      Horas: Horas
    };

    return this.http.post(this.apiUrl+'/rango', body).pipe(
      catchError(this.handleError)
    );
  }

  


  addCapacitacionFecha(IdProgramacionCapacitacion:number | null, Fecha: Date, Horas:number):Observable<any>{
    const body = {
      IdProgramacionCapacitacion: IdProgramacionCapacitacion,
      Fecha: Fecha,
      Horas: Horas
    };

    return this.http.post(this.apiUrl+'/fecha', body).pipe(
      catchError(this.handleError)
    );
  }


  getCapacitacionEmpleado(NoNomina: number | undefined):Observable<CapacitacionesEmpleado[]>{
    const body = {
      NoNomina: NoNomina
    };

    return this.http.post<CapacitacionesEmpleado[]>(this.apiUrl+'/capacitacionempleado', body).pipe(
      catchError(this.handleError)
    );
  }


  getConsultaCapacitaciones(FechaInicio:Date | undefined, FechaFin:Date | undefined):Observable<CapacitacionProgramada[]>{
    const body = {
      FechaInicio: FechaInicio,
      FechaFin: FechaFin
    };

    return this.http.post<CapacitacionProgramada[]>(this.apiUrl+'/consultacapacitaciones', body).pipe(
      catchError(this.handleError)
    );
  }
  
  /*
  

  getsingleCatalogo(CodigoCapacitacion: String): Observable<CapacitacionCatalogo[]> {
    return this.http.get<CapacitacionCatalogo[]>(this.apiUrl+'/single/'+"'"+CodigoCapacitacion+"'"
    );
  }*/

  getFechasProgramaciones(id: number): Observable<CapacitacionProgramada[]> {
    return this.http.get<CapacitacionProgramada[]>(this.apiUrl+'/programacionfechaall/'+id
    );
  }


  
  /*getPuestosByDepartamento(departamentoId: number){
    return this.http.get<Cat[]>(this.apiUrl+'/'+departamentoId);
  }*/
 
  deleteCatalogoCapacitacion(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  getProgramacionCapacitaciones(): Observable<CapacitacionProgramada[]> {
    return this.http.get<CapacitacionProgramada[]>(this.apiUrl+'/programacionactive');
  }

  deleteProgramacionCapacitacion(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/programacionactive/'+id).pipe(
      catchError(this.handleError)
    );
  }
  

  getsingleProgramacionCapacitacion(id: number): Observable<CapacitacionProgramada[]> {
    return this.http.get<CapacitacionProgramada[]>(this.apiUrl+'/programacionall/'+id
    );
  }

  getsingleProgramaciones(id: number): Observable<CapacitacionesSuscripciones[]> {
    return this.http.get<CapacitacionesSuscripciones[]>(this.apiUrl+'/programaciones/'+id);
  }

  getsingleCalificaciones(id: number): Observable<Calificaciones[]> {
    return this.http.get<Calificaciones[]>(this.apiUrl+'/calificaciones/'+id
    );
  }
  
  addSuscripcion(data: any):Observable<any>{
    return this.http.post(this.apiUrl+'/programaciones', data).pipe(
      catchError(this.handleError)
    );
  }

  deleteSuscripcion(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/programaciones/'+id).pipe(
      catchError(this.handleError)
    );
  }

  addEvaluacion(data: any): Observable<any>{
    return this.http.post(this.apiUrl+'/evaluar', data).pipe(
      catchError(this.handleError)
    );
  }

  addAsistencia(data: any): Observable<any>{
    return this.http.post(this.apiUrl+'/asistencia', data).pipe(
      catchError(this.handleError)
    );
  }

  updateCapacitacion(IdProgramacionCapacitacion: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/'+IdProgramacionCapacitacion, data).pipe(
      catchError(this.handleError)
    );
  }

  updateFechasCapacitacion(IdProgramacionCapacitacion: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/actualizarfechas/'+IdProgramacionCapacitacion, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Puedes personalizar el mensaje de error basándote en el error.status o error.error
    return throwError(() => new Error(`An error occurred: ${error.status}, ${error.message}`));
  }

}
