import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Puesto } from '../models/puesto.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PuestosService {

  private apiUrl = 'http://localhost:3000/puestos';

  constructor(private http: HttpClient) { }

  addPuestos(data: any):Observable<any>{
    return this.http.post('http://localhost:3000/puestos', data).pipe(
      catchError(this.handleError)
    );
  }
  
  updatePuestos(IdPuesto: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/'+IdPuesto, data).pipe(
      catchError(this.handleError)
    );;
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