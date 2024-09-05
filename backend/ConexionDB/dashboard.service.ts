import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { D_Departamentos, D_EstadoCivil, D_IncidenciasPeriodo, D_CapacitacionesPeriodo, D_ContratacionesPeriodo, D_Edades } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:3000/dashboard';

constructor(private http: HttpClient) { }

getEmpleadosPorDepartamento(): Observable<D_Departamentos[]> {
    return this.http.get<D_Departamentos[]>(this.apiUrl+'/departamentos');
  }
getEmpleadosporEstadoCivil(): Observable<D_EstadoCivil[]> {
    return this.http.get<D_EstadoCivil[]>(this.apiUrl+'/estadocivil');
}
getIncidencias(Periodo: string): Observable<D_IncidenciasPeriodo[]> {
  const body = {
    Periodo: Periodo
  };
  return this.http.post<D_IncidenciasPeriodo[]>(this.apiUrl+'/incidencias', body);
}

getCapacitaciones(Periodo: string): Observable<D_CapacitacionesPeriodo[]> {
  const body = {
    Periodo: Periodo
  };
  return this.http.post<[D_CapacitacionesPeriodo]>(this.apiUrl+'/capacitaciones', body);
}

getContrataciones(Periodo: string): Observable<D_ContratacionesPeriodo[]> {
  const body = {
    Periodo: Periodo
  };
  return this.http.post<[D_ContratacionesPeriodo]>(this.apiUrl+'/contrataciones', body);
}

getEmpleadosporEdades(): Observable<D_Edades[]> {
  return this.http.get<D_Edades[]>(this.apiUrl+'/edades');
}


}
