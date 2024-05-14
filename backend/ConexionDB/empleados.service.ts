import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Departamento } from '../models/departamento.model';
import { inputDepartamento } from '../models/inputDepartament.model';
import { catchError } from 'rxjs/operators';
import { Empleado } from '../models/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private apiUrl = 'http://localhost:3000/empleados';
 // https://5xc79jbt-3000.usw3.devtunnels.ms/empleados

  constructor(private http: HttpClient) { }

  addEmpleados(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }
  
  updateEmpleados(id: number, data: any): Observable<any> {
    return this.http.post(this.apiUrl+'/'+id, data).pipe(
      catchError(this.handleError)
    );
  }


  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  deleteEmpleados(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Puedes personalizar el mensaje de error basándote en el error.status o error.error
    return throwError(() => new Error(`An error occurred: ${error.status}, ${error.message}`));
  }

  /*

 */

}