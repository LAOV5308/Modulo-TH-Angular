import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Departamento } from '../models/departamento.model';
import { inputDepartamento } from '../models/inputDepartament.model';
import { catchError } from 'rxjs/operators';
import { Empleado } from '../models/empleado.model';
import { Capacitacion } from '../models/capacitacion.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private apiUrl = 'http://localhost:3000/empleados';
  
  //private apiUrl = 'https://2vbqt1w4-3000.usw3.devtunnels.ms/empleados';

 
  constructor(private http: HttpClient) {
   }

   
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


  cambioPuesto(NoNomina: number, NombrePuestoAnterior: string, NombrePuestoNuevo:string, FechaCambio: Date,Antiguedad:number):Observable<any>{
    const body = {
      NoNomina: NoNomina,
      NombrePuestoAnterior: NombrePuestoAnterior, 
      NombrePuestoNuevo: NombrePuestoNuevo, 
      FechaCambio: FechaCambio, 
      Antiguedad: Antiguedad
    };

    return this.http.post(this.apiUrl+'/cambiopuesto', body).pipe(
      catchError(this.handleError)
    );
  }

  getCapacitaciones(): Observable<Capacitacion[]> {
    return this.http.get<Capacitacion[]>(this.apiUrl+'/capacitacion').pipe(
      catchError(this.handleError)
    );
  }

  addCapacitaciones(data: any): Observable<any> {
    return this.http.post(this.apiUrl+'/capacitacion', data).pipe(
      catchError(this.handleError)
    );
  }

  postIngreso(data: any): Observable<any> {
    return this.http.post(this.apiUrl+'/programarcapacitacion', data).pipe(
      catchError(this.handleError)
    );
  }
  
  
  updateEmpleados(id: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/'+id, data).pipe(
      catchError(this.handleError)
    );
  }

  /*
  getEmpleado(id: number){
    return this.http.get<{ Nombre: string, Apellidos: string, Sexo: string, EstadoCivil: string, FechaNacimiento: Date, EntidadNacimiento: string, CiudadNacimiento: string, CURP: string, RFC: string, NSS: string, UMF: string, NoNomina: number, Nivel: string, NombreDepartamento: string, NombrePuesto: string, NombreResponsable: string, TipoIngreso: string, Ingreso: Date, HorarioSemanal: string, DomicilioIne: string, Poblacion: string, EntidadDireccion: string, CP: string, CorreoElectronico: string, NumeroTelefono1: string, NumeroTelefono2: string, NombreBeneficiario: string, Parentesco: string, FechaNacimientoBeneficiario: Date, NumeroTelefonoEmergencia: string}>(
      this.apiUrl+'/'+ id
    );
  }*/

  /*getEmpleado(id: number): Observable<any> {
    return this.http.get(this.apiUrl+'/'+id);
  }*/
  getEmpleado(id: number | undefined): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl+'/'+id);
  }
  

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

  private handleError(error: HttpErrorResponse) {
    // Puedes personalizar el mensaje de error basándote en el error.status o error.error
    return throwError(() => new Error(`An error occurred: ${error.status}, ${error.message}`));
  }

  /*

 */

}