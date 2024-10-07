import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Peticion } from './Service';
import { Role, Usuario } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private userRole: string = '';
  private NombreUser: string = '';
  private IdUsuario: number = 0;

  
  private apiUrl = Peticion.apiUrl+'usuarios';
  
  //private apiUrl ='https://all-keys-sip.loca.lt/usuarios'
  //private apiUrl = 'https://2vbqt1w4-3000.usw3.devtunnels.ms/usuarios';

  constructor(private http: HttpClient, private router: Router) { 
  }


  getUsers():Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getUser(IdUser: number | null):Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl+'/'+IdUser);
  }

  


  getRoles():Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl+'/roles');
  }

  getRole(IdRole: number):Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl+'/roles/'+IdRole);
  }

  updateRole(IdRole:number, NombreRole:string, DescripcionRole:string):Observable<any> {
    const body = {
      NombreRole: NombreRole,
      DescripcionRole: DescripcionRole
    }
    return this.http.put<any>(this.apiUrl+'/roles/'+IdRole, body);
  }
  

  addRole(NombreRole:string, DescripcionRole:string):Observable<any> {
    const body = {
      NombreRole: NombreRole,
      DescripcionRole: DescripcionRole,
    };

    return this.http.post<any>(this.apiUrl+'/roles', body);
    
  }

  addPermisos(IdRole:number, NombreColumna:string):Observable<any> {
    const body = {
      IdRole: IdRole,
      NombreColumna: NombreColumna,
    };

    return this.http.post<any>(this.apiUrl+'/permisos', body);
    
  }

  register(NombreUsuario:string, IdRole:number, Password:string):Observable<any> {
    const body = {
      NombreUsuario:NombreUsuario,
      IdRole: IdRole,
      Password: Password,
      FechaCreacion: new Date()
    };

    return this.http.post<any>(this.apiUrl+'/register', body);
    
  }

  updateUser(IdUsuario: number,NombreUsuario:string, IdRole:number, Password:string):Observable<any> {
    const body = {
      NombreUsuario:NombreUsuario,
      IdRole: IdRole,
      Password: Password
    };

    return this.http.put<any>(this.apiUrl+'/user/'+IdUsuario, body);
    
  }

  updateUserSinContrasena(IdUsuario: number,NombreUsuario:string, IdRole:number):Observable<any> {
    const body = {
      NombreUsuario:NombreUsuario,
      IdRole: IdRole,
    };

    return this.http.put<any>(this.apiUrl+'/usersc/'+IdUsuario, body);
    
  }

  deleteUser(IdUser: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+IdUser);
  }

  deleteRole(IdRole: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/roles/'+IdRole);
  }



  login(NombreUsuario: string, Password: string): Observable<any> {
    return this.http.post<{ token: string }>(this.apiUrl+'/login', { NombreUsuario: NombreUsuario, Password: Password })
      .pipe(
        tap(response => {
          if (this.isLocalStorageAvailable()) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }




  isLoggedIn(): boolean {
    if (this.isLocalStorageAvailable()) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getToken(): string | null {
    
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    console.log(token);
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userRole = decoded.NombreRole;
      console.log(this.userRole);
      return this.userRole;
    }
    return null;
  }

  getNombreUser(): string | null{
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      this.NombreUser = decoded.NombreUsuario;
      return this.NombreUser;
    }
    return null;
  }

  getIdUser(): number | null{
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      this.IdUsuario = decoded.IdUsuario;
      console.log(this.IdUsuario);
      return this.IdUsuario;
    }
    return null;
  }
  
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
      this.userRole = '';
      //this.router.navigate(['/login']);
    }
    this.router.navigate(['/login']);
  }


  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }


  passConsultarEmpleados(): boolean{

    return false;
  }

  passHistorialEmpleados(): boolean{

    return false;
  }

  passIncidencias(): boolean{

    return false;
  }

  passVacaciones(): boolean{

    return false;
  }

  passDashboard(): boolean{

    return false;
  }

  passConsultarCapacitaciones(): boolean{

    return false;
  }

  passDepartamentos(): boolean{

    return false;
  }

  passPuestos(): boolean{

    return false;
  }

  passUsuarios(): boolean{

    return false;
  }

  passReportes(): boolean{

    return false;
  }

}
