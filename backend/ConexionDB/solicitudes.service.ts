import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Departamento } from '../models/departamento.model';
import { inputDepartamento } from '../models/inputDepartament.model';
import { catchError } from 'rxjs/operators';
import { SolicitudAceptada, SolicitudProceso, SolicitudRechazada } from '../models/solicitudes.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  //private apiUrl = 'http://localhost:3000/solicitudes';
  private apiUrl ='https://all-keys-sip.loca.lt/solicitudes'

  constructor(private http: HttpClient) {
    
   }

   
  getSolicitudesAceptadas(): Observable<SolicitudAceptada[]> {
    return this.http.get<SolicitudAceptada[]>(this.apiUrl+'/aceptadas');
  }
  getSolicitudesRechazadas(): Observable<SolicitudRechazada[]> {
    return this.http.get<SolicitudRechazada[]>(this.apiUrl+'/rechazadas');
  }
  getSolicitudesProceso(): Observable<SolicitudProceso[]> {
    return this.http.get<SolicitudProceso[]>(this.apiUrl+'/proceso');
  }
  
  addSolicitud(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  /*

  addEmpleados(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  addBajaEmpleado(id: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/bajas/'+id, data).pipe(
      catchError(this.handleError)
    );
  }

  recuperarEmpleado(data: any): Observable<any> {
    return this.http.post(this.apiUrl+'/recuperar/', data).pipe(
      catchError(this.handleError)
    );
  }


  addCapacitaciones(data: any): Observable<any> {
    return this.http.post(this.apiUrl+'/capacitacion', data).pipe(
      catchError(this.handleError)
    );
  }
  
  
  updateEmpleados(id: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/'+id, data).pipe(
      catchError(this.handleError)
    );
  }*/

  /*
  getEmpleado(id: number){
    return this.http.get<{ Nombre: string, Apellidos: string, Sexo: string, EstadoCivil: string, FechaNacimiento: Date, EntidadNacimiento: string, CiudadNacimiento: string, CURP: string, RFC: string, NSS: string, UMF: string, NoNomina: number, Nivel: string, NombreDepartamento: string, NombrePuesto: string, NombreResponsable: string, TipoIngreso: string, Ingreso: Date, HorarioSemanal: string, DomicilioIne: string, Poblacion: string, EntidadDireccion: string, CP: string, CorreoElectronico: string, NumeroTelefono1: string, NumeroTelefono2: string, NombreBeneficiario: string, Parentesco: string, FechaNacimientoBeneficiario: Date, NumeroTelefonoEmergencia: string}>(
      this.apiUrl+'/'+ id
    );
  }*/

  /*getEmpleado(id: number): Observable<any> {
    return this.http.get(this.apiUrl+'/'+id);
  }*/

  

  /*
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  getEmpleadosInactive(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl+'/inactive');
  }

  getEmpleadosAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl+'/all');
  }

  deleteEmpleados(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError));
  }
*/
  private handleError(error: HttpErrorResponse) {
    // Puedes personalizar el mensaje de error basándote en el error.status o error.error
    return throwError(() => new Error(`An error occurred: ${error.status}, ${error.message}`));
  }

  /*

 */

}