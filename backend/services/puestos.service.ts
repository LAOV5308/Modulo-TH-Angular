import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Puesto } from '../models/puesto.model';
import { catchError } from 'rxjs/operators';
import { Peticion } from './Service';
@Injectable({
  providedIn: 'root'
})
export class PuestosService {

  //private apiUrl = 'http://localhost:3000/puestos';
  //private apiUrl ='https://all-keys-sip.loca.lt/puestos'
  private apiUrl = Peticion.apiUrl+'puestos';

  constructor(private http: HttpClient) { }

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


  getPuestos(): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(this.apiUrl);
  }
  

  getPuestosByDepartamento(departamentoId: number){
    return this.http.get<Puesto[]>(this.apiUrl+'/'+departamentoId);
  }



  deletePuestos(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  private handleError(error: HttpErrorResponse) {
    // Puedes personalizar el mensaje de error basándote en el error.status o error.error
    return throwError(() => new Error(`An error occurred: ${error.status}, ${error.message}`));
  }

}