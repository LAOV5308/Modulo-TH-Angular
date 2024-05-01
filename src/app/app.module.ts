import { NgModule } from "@angular/core";
import { LoginComponent } from "../../frontend/login/login.component";
import { DataService } from '../../backend/ConexionDB/data.service';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
    declarations: [
        
    ],
    imports: [
      LoginComponent,
      MatButtonModule
    ],
    providers: [DataService],
    bootstrap: []
  })
  export class AppModule { }