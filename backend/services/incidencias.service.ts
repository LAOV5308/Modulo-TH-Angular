import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Incidencia } from '../models/incidencia.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  private apiUrl = 'http://localhost:3000/incidencias';
  //private apiUrl ='https://all-keys-sip.loca.lt/incidencias'
  private incidencias: Incidencia[] = [];

  constructor(private http: HttpClient) { }

  addIncidencias(data: any):Observable<any>{
    return this.http.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }
  
  updateIncidencia(IdIncidencia: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/'+IdIncidencia, data).pipe(
      catchError(this.handleError)
    );
  }

  closeIncidencia(IdIncidencia: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/close/'+IdIncidencia, data).pipe(
      catchError(this.handleError)
    );
  }

  getIncidenciasPorEmpleado(NoNomina: number | undefined): Observable<Incidencia[]> {
    const body={
      NoNomina: NoNomina
    };
    return this.http.post<Incidencia[]>(this.apiUrl+'/empleado', body);
  }



  getIncidencias(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(this.apiUrl);
  }
  getIncidenciasClose(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(this.apiUrl+'/close');
  }
  getIncidenciasAll(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(this.apiUrl+'/all');
  }

    /*
  getIncidencias(): Observable<any> {
    return this.http.get(this.apiUrl);
  }*/

  deleteIncidencias(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  private handleError(error: HttpErrorResponse) {
    // Puedes personalizar el mensaje de error basándote en el error.status o error.error
    return throwError(() => new Error(`An error occurred: ${error.status}, ${error.message}`));
  }

}
