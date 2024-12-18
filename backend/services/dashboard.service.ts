import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { D_Departamentos, D_EstadoCivil, D_IncidenciasPeriodo, D_CapacitacionesPeriodo, D_ContratacionesPeriodo, D_Edades, D_Bajas, D_RangoAntiguedad, D_IncidenciasPorDepartamento, D_SalidasEdades, D_CambiosPorDepartamento, D_HorasCapacitacionDepartamento, D_FaltasDepartamento, D_SumaIncidenciasPorDepartamento, D_MotivoSalida } from '../models/dashboard.model';
import { Peticion } from './Service';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  //private apiUrl = 'http://localhost:3000/dashboard';
  private apiUrl = Peticion.apiUrl+'dashboard';
  //private apiUrl ='https://all-keys-sip.loca.lt/dashboard'
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

/*getSumaDiasIncidenciasPorDepartamento(Periodo: string): Observable<D_SalidasEdades[]> {
  const body = {
    Periodo: Periodo
  };
  return this.http.post<D_SalidasEdades[]>(this.apiUrl+'/sumaincidencias', body);
}*/

getSumaHorasCapacitacionPorDepartamento(FechaInicio: Date, FechaFin: Date): Observable<D_HorasCapacitacionDepartamento[]> {
  const body = {
    FechaInicio: FechaInicio,
    FechaFin: FechaFin
  };
  return this.http.post<D_HorasCapacitacionDepartamento[]>(this.apiUrl+'/horasdepartamento', body);
}


getFaltasPorDepartamento(FechaInicio: Date, FechaFin: Date, Tipo: number): Observable<D_FaltasDepartamento[]> {
  const body = {
    FechaInicio: FechaInicio,
    FechaFin: FechaFin,
    Tipo: Tipo
  };
  return this.http.post<D_FaltasDepartamento[]>(this.apiUrl+'/faltasdepartamento', body);
}


getEmpleadosporEdades(): Observable<D_Edades[]> {
  return this.http.get<D_Edades[]>(this.apiUrl+'/edades');
}

getRangosAntiguedadActive(): Observable<D_RangoAntiguedad[]> {
  return this.http.get<D_RangoAntiguedad[]>(this.apiUrl+'/rangoantiguedadactive');
}


getRangosAntiguedadSalidas(FechaInicio: Date, FechaFin: Date): Observable<D_RangoAntiguedad[]> {
  const body = {
    FechaInicio: FechaInicio,
    FechaFin: FechaFin
  };

  return this.http.post<D_RangoAntiguedad[]>(this.apiUrl+'/rangoantiguedadsalidas', body);
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
getIncidenciasPorDepartamento(FechaInicio: Date, FechaFin: Date): Observable<D_IncidenciasPorDepartamento[]> {
  const body = {
    FechaInicio: FechaInicio,
    FechaFin: FechaFin
  };

  return this.http.post<D_IncidenciasPorDepartamento[]>(this.apiUrl+'/incidenciaspordepartamento', body);
}


//Obtener Bajas Por Departamento
getBajasPorDepartamento(FechaInicio: Date, FechaFin: Date): Observable<D_Departamentos[]> {
  const body = {
    FechaInicio: FechaInicio,
    FechaFin: FechaFin
  };

  return this.http.post<D_Departamentos[]>(this.apiUrl+'/bajaspordepartamento', body);
}


getDiasIncidenciasPorDepartamento(FechaInicio: Date, FechaFin: Date): Observable<D_SumaIncidenciasPorDepartamento[]> {
  const body = {
    FechaInicio: FechaInicio,
    FechaFin: FechaFin
  };

  return this.http.post<D_SumaIncidenciasPorDepartamento[]>(this.apiUrl+'/diasincidenciasdepartamento', body);
}

getMotivosSalida(FechaInicio: Date, FechaFin: Date): Observable<D_MotivoSalida[]> {
  const body = {
    FechaInicio: FechaInicio,
    FechaFin: FechaFin
  };

  return this.http.post<D_MotivoSalida[]>(this.apiUrl+'/motivosalida', body);
}







}
