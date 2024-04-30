import { NgModule } from "@angular/core";
import { LoginComponent } from "../../frontend/login/login.component";
import { DataService } from '../../backend/ConexionDB/data.service';



@NgModule({
    declarations: [
        
    ],
    imports: [
      LoginComponent
    ],
    providers: [DataService],
    bootstrap: []
  })
  export class AppModule { }