import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Peticion } from './Service';
import { Falta, FechaPagar } from '../models/falta.model';

@Injectable({
  providedIn: 'root'
})
export class FaltasService {

  
  private apiUrl = Peticion.apiUrl+'faltas';

  constructor(private http: HttpClient) { }


  getFaltasCerrados():Observable<Falta[]>{
    return this.http.get<Falta[]>(this.apiUrl+'/cerrados');
  }

  getFaltasAbiertos():Observable<Falta[]>{
    return this.http.get<Falta[]>(this.apiUrl+'/abiertos');
  }

  getFalta(IdFalta: number):Observable<Falta[]>{
    return this.http.get<Falta[]>(this.apiUrl+'/'+IdFalta);
  }

  addFalta(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  addFechaPagar(IdFalta: number, FechaPagar:Date, Comentario: string): Observable<any> {
    const body = {
      IdFalta: IdFalta, 
      FechaPagar: FechaPagar, 
      Comentario: Comentario
    }

    return this.http.post(this.apiUrl+'/fechaspagar', body).pipe(
      catchError(this.handleError)
    );
  }

  closefalta(IdFalta: number): Observable<any> {
    const body = {
      IdFalta: IdFalta
    }

    return this.http.post(this.apiUrl+'/faltacerrar', body).pipe(
      catchError(this.handleError)
    );
  }

  deleteFalta(IdFalta: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+IdFalta);
  }

  deleteFaltaPagar(IdFaltaPagar: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/fechapagar/'+IdFaltaPagar);
  }

  

  getfechaspagar(IdFalta: number):Observable<FechaPagar[]>{
    return this.http.get<FechaPagar[]>(this.apiUrl+'/fechaspagar/'+IdFalta);
  }






  /*getAllBajas():Observable<Baja[]>{
    return this.http.get<Baja[]>(this.apiUrl);
  }


 getBajas(id: number): Observable<Baja[]> {
    return this.http.get<Baja[]>(this.apiUrl+'/'+id
    );
  };


  getIncidencias(id: number): Observable<IncidenciaB[]> {
    return this.http.get<IncidenciaB[]>(this.apiUrl+'/incidencias/'+id
    );
  };*/

  private handleError(error: HttpErrorResponse) {
    // Puedes personalizar el mensaje de error basándote en el error.status o error.error
    return throwError(() => new Error(`An error occurred: ${error.status}, ${error.message}`));
  }

}
