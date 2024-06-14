import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Departamento } from '../models/departamento.model';
import { inputDepartamento } from '../models/inputDepartament.model';
import { catchError } from 'rxjs/operators';

import { CapacitacionCatalogo } from '../models/capacitacioncatalogo.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogoCapacitacionServiceService {

  
  private apiUrl = 'http://localhost:3000/capacitaciones';

  constructor(private http: HttpClient) { }

  addCatalogoCapacitacion(data: any):Observable<any>{
    return this.http.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }
  
  updateCatalogoCapacitacion(CodigoCapacitacion: string, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/'+CodigoCapacitacion, data).pipe(
      catchError(this.handleError)
    );
  }

  getCatalogoCapacitaciones(): Observable<CapacitacionCatalogo[]> {
    return this.http.get<CapacitacionCatalogo[]>(this.apiUrl);
  }

  getsingleCatalogo(CodigoCapacitacion: String): Observable<CapacitacionCatalogo[]> {
    return this.http.get<CapacitacionCatalogo[]>(this.apiUrl+'/single/'+"'"+CodigoCapacitacion+"'"
    );
  }

  
  /*getPuestosByDepartamento(departamentoId: number){
    return this.http.get<Cat[]>(this.apiUrl+'/'+departamentoId);
  }*/
 
  deleteCatalogoCapacitacion(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  private handleError(error: HttpErrorResponse) {
    // Puedes personalizar el mensaje de error basándote en el error.status o error.error
    return throwError(() => new Error(`An error occurred: ${error.status}, ${error.message}`));
  }

}
