//private apiUrl = 'http://localhost:3000/departamentos';
//private apiUrl ='https://all-keys-sip.loca.lt/departamentos'


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Departamento } from '../models/departamento.model';
import { catchError } from 'rxjs/operators';
import { Peticion } from './Service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private apiUrl = Peticion.apiUrl+'departamentos';
  constructor(private http: HttpClient) { }

  //Agregar Nuevo Departamentos
  addDepartamentos(data: any):Observable<any>{
    return this.http.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }
  
  //Actualizar departamento
  updateDepartamentos(IdDepartamento: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/'+IdDepartamento, data).pipe(
      catchError(this.handleError)
    );;
  }

  //Obtener Departamentos
  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }

  //Elminar algun departamento
  deleteDepartamentos(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  private handleError(error: HttpErrorResponse) {
    // Puedes personalizar el mensaje de error basándote en el error.status o error.error
    return throwError(() => new Error(`An error occurred: ${error.status}, ${error.message}`));
  }

}
