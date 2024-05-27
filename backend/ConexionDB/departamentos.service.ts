import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Departamento } from '../models/departamento.model';
import { inputDepartamento } from '../models/inputDepartament.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private apiUrl = 'http://localhost:3000/departamentos';
  private inputDepartamentos: inputDepartamento[] = [];

  constructor(private http: HttpClient) { }

  addDepartamentos(data: any):Observable<any>{
    return this.http.post('http://localhost:3000/departamentos', data).pipe(
      catchError(this.handleError)
    );
  }
  
  updateDepartamentos(IdDepartamento: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/'+IdDepartamento, data).pipe(
      catchError(this.handleError)
    );;
  }

  /*
  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }*/
  getDepartamentos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteDepartamentos(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  private handleError(error: HttpErrorResponse) {
    // Puedes personalizar el mensaje de error basándote en el error.status o error.error
    return throwError(() => new Error(`An error occurred: ${error.status}, ${error.message}`));
  }

}
