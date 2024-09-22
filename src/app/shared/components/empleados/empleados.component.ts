import { Component, OnInit } from '@angular/core';
import { DatosComponent } from '../../../../../frontend/Datos/datos/datos.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { EmpleadosService } from '../../../../../backend/ConexionDB/empleados.service';
import { DatosDepartamentosComponent } from '../../../../../frontend/datos-departamentos/datos-departamentos.component';


@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    DatosComponent,
    MatButtonModule,
    MatCardModule
  ],
  providers:[EmpleadosService],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit{

  constructor(
  ){

  }


  ngOnInit(): void {
    
  }

  agregarempleado(){
   // const dialog = this._dialog.open(CreateEmpleadoComponent);
    /*
    dialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.datosDepartamentod.actualizar();

        }
      },
    });*/

  }

}
