import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private apiUrl = 'http://localhost:3000/empleados';
 // https://5xc79jbt-3000.usw3.devtunnels.ms/empleados

  constructor(private http: HttpClient) { }

  addEmpleados(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  
  updateEmpleados(id: number, data: any): Observable<any> {
    return this.http.post(this.apiUrl+'/'+id, data);
  }


  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  deleteEmpleados(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+id,);
  }

}
