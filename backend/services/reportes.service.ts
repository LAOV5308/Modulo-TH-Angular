import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Reporte } from '../models/reporte.model';
import { catchError } from 'rxjs/operators';
import { Peticion } from './Service';
@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  //private apiUrl = 'http://localhost:3000/reportes';
  private apiUrl = Peticion.apiUrl+'reportes';

  constructor(private http: HttpClient) { }



  getReportes(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(this.apiUrl);
  }

  getReporte(IdFalta: number): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(this.apiUrl+'/'+IdFalta);
  }




  addReporte(data: any):Observable<any>{
    return this.http.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteReporte(IdReporte: number){
    return this.http.delete(this.apiUrl+'/'+IdReporte).pipe(
      catchError(this.handleError)
    );
  }

  updateReporte(IdReporte: number,data: any):Observable<any>{
    return this.http.put(this.apiUrl+'/'+IdReporte, data).pipe(
      catchError(this.handleError)
    );
  }


/*

  addPuestos(data: any):Observable<any>{
    return this.http.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }
  
  updatePuestos(IdPuesto: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/'+IdPuesto, data).pipe(
      catchError(this.handleError)
    );
  }

  getPuestosByDepartamento(departamentoId: number){
    return this.http.get<Puesto[]>(this.apiUrl+'/'+departamentoId);
  }



  deletePuestos(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id);
  }*/

  private handleError(error: HttpErrorResponse) {
    // Puedes personalizar el mensaje de error basándote en el error.status o error.error
    return throwError(() => new Error(`An error occurred: ${error.status}, ${error.message}`));
  }

}