import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private userRole: string = '';
  private NombreUser: string = '';

  
  private apiUrl = 'http://localhost:3000/usuarios';
  
  //private apiUrl = 'https://2vbqt1w4-3000.usw3.devtunnels.ms/usuarios';

  constructor(private http: HttpClient, private router: Router) { 

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
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userRole = decoded.NombreRol;
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

}
