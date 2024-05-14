import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { DatosComponent } from '../../../../../frontend/Datos/datos/datos.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { EmpleadosService } from '../../../../../backend/ConexionDB/empleados.service';
import { LoginComponent } from '../../../../../frontend/login/login.component';
import { CreateEmpleadoComponent } from './create-empleado/create-empleado.component';
import { DatosDepartamentosComponent } from '../../../../../frontend/datos-departamentos/datos-departamentos.component';


@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [HeaderComponent,
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
