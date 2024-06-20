import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})

export class AuthService {

  
  private apiUrl = 'http://localhost:3000/usuarios';

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

  
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
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
