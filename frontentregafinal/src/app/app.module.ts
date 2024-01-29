import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProyectoService } from './Services/proyecto.service';
import { ListarproyectoComponent } from './Components/Proyecto/listarproyecto/listarproyecto.component';
import { CrearproyectoComponent } from './Components/Proyecto/crearproyecto/crearproyecto.component';
import { EditarproyectoComponent } from './Components/Proyecto/editarproyecto/editarproyecto.component';
import { CrearempleadoComponent } from './Components/Empleado/crearempleado/crearempleado.component';
import { ListarempleadoComponent } from './Components/Empleado/listarempleado/listarempleado.component';
import { EditarempleadoComponent } from './Components/Empleado/editarempleado/editarempleado.component';
import { CrearproyectoempleadoComponent } from './Components/Proyectoempleados/crearproyectoempleado/crearproyectoempleado.component';
import { ListarproyectoempleadoComponent } from './Components/Proyectoempleados/listarproyectoempleado/listarproyectoempleado.component';
import { CreatejefeComponent } from './Components/Jefes/createjefe/createjefe.component';
import { ListarjefeComponent } from './Components/Jefes/listarjefe/listarjefe.component';
import { ListartareaComponent } from './Components/Tareas/listartarea/listartarea.component';
import { CreartareaComponent } from './Components/Tareas/creartarea/creartarea.component';
import { EditarComponent } from './Components/Tareas/editar/editar.component';
import { LoginconsultaComponent } from './Components/Logins/loginconsulta/loginconsulta.component';
import { LoginingresoempleadoComponent } from './Components/Logins/loginingresoempleado/loginingresoempleado.component';
import { LoginingresojefeComponent } from './Components/Logins/loginingresojefe/loginingresojefe.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarproyectoComponent,
    CrearproyectoComponent,
    EditarproyectoComponent,
    CrearempleadoComponent,
    ListarempleadoComponent,
    EditarempleadoComponent,
    CrearproyectoempleadoComponent,
    ListarproyectoempleadoComponent,
    CreatejefeComponent,
    ListarjefeComponent,
    ListartareaComponent,
    CreartareaComponent,
    EditarComponent,
    LoginconsultaComponent,
    LoginingresoempleadoComponent,
    LoginingresojefeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProyectoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
