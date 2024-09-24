import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Baja } from '../models/baja.model';
import { IncidenciaB } from '../models/incidencia.model';
import { Peticion } from './Service';

@Injectable({
  providedIn: 'root'
})
export class BajasService {

  
  private apiUrl = Peticion.apiUrl+'bajas';
  //private apiUrl ='https://all-keys-sip.loca.lt/bajas'
  //private apiUrl = 'https://2vbqt1w4-3000.usw3.devtunnels.ms/capacitaciones';

  constructor(private http: HttpClient) { }

  getAllBajas():Observable<Baja[]>{
    return this.http.get<Baja[]>(this.apiUrl);
  }


 getBajas(id: number): Observable<Baja[]> {
    return this.http.get<Baja[]>(this.apiUrl+'/'+id
    );
  };


  getIncidencias(id: number): Observable<IncidenciaB[]> {
    return this.http.get<IncidenciaB[]>(this.apiUrl+'/incidencias/'+id
    );
  };

  private handleError(error: HttpErrorResponse) {
    // Puedes personalizar el mensaje de error basándote en el error.status o error.error
    return throwError(() => new Error(`An error occurred: ${error.status}, ${error.message}`));
  }

}
