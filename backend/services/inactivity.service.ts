import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private timeoutId: any;
  //15 minutos de Inactividad 900000
  private readonly timeLimit: number = 900000; // 1 hora en milisegundos 3600000 

  constructor(private router: Router, private ngZone: NgZone) {}

  // Método para resetear el temporizador
  public resetTimer(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.handleInactivity(), this.timeLimit);
  }

  // Método para manejar la inactividad después de 1 hora
  private handleInactivity(): void {
    //localStorage.removeItem('token');
    if (this.isLocalStorageAvailable()) {
      //localStorage.clear();
      localStorage.removeItem('token');
      //this.router.navigate(['/login']);
    }

    this.router.navigate(['/login']); // Redirigir a la página de login
  }

  // Método para detener el temporizador si se requiere
  public stopTimer(): void {
    clearTimeout(this.timeoutId);
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
