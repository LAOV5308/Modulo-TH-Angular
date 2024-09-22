import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { D_Departamentos, D_EstadoCivil, D_IncidenciasPeriodo, D_CapacitacionesPeriodo, D_ContratacionesPeriodo, D_Edades, D_Bajas, D_RangoAntiguedad, D_IncidenciasPorDepartamento, D_SalidasEdades, D_CambiosPorDepartamento } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  //private apiUrl = 'http://localhost:3000/dashboard';
  private apiUrl ='https://all-keys-sip.loca.lt/dashboard'
  //private apiUrl = 'https://2vbqt1w4-3000.usw3.devtunnels.ms/dashboard'

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

getSalidasEdadesPeriodo(Periodo: string): Observable<D_SalidasEdades[]> {
  const body = {
    Periodo: Periodo
  };
  return this.http.post<[D_SalidasEdades]>(this.apiUrl+'/salidasedades', body);
}

getSumaDiasIncidenciasPorDepartamento(Periodo: string): Observable<D_SalidasEdades[]> {
  const body = {
    Periodo: Periodo
  };
  return this.http.post<[D_SalidasEdades]>(this.apiUrl+'/sumaincidencias', body);
}



getEmpleadosporEdades(): Observable<D_Edades[]> {
  return this.http.get<D_Edades[]>(this.apiUrl+'/edades');
}

getRangosAntiguedadActive(): Observable<D_RangoAntiguedad[]> {
  return this.http.get<D_RangoAntiguedad[]>(this.apiUrl+'/rangoantiguedadactive');
}


getRangosAntiguedadSalidas(): Observable<D_RangoAntiguedad[]> {
  return this.http.get<D_RangoAntiguedad[]>(this.apiUrl+'/rangoantiguedadsalidas');
}


getEmpleadosporEdadesBajas(): Observable<D_Bajas[]> {
  return this.http.get<D_Bajas[]>(this.apiUrl+'/bajas');
}

getbajasDepartamento(): Observable<D_Departamentos[]> {
  return this.http.get<D_Departamentos[]>(this.apiUrl+'/bajasdepartamento');
}
getCambiosDepartamento(): Observable<D_CambiosPorDepartamento[]> {
  return this.http.get<D_CambiosPorDepartamento[]>(this.apiUrl+'/cambiospordepartamento');
}



//Obtener Incidencias Por Departamento
getIncidenciasPorDepartamento(): Observable<D_IncidenciasPorDepartamento[]> {
  return this.http.get<D_IncidenciasPorDepartamento[]>(this.apiUrl+'/incidenciaspordepartamento');
}


}
