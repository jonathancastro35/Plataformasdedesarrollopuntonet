import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: 'loginingresojefe'},
  { path: 'listarproyectos', component:ListarproyectoComponent},
  { path: 'createusuariolista', component:CrearproyectoComponent},
  { path: 'editarproyecto/:id', component:EditarproyectoComponent},
  { path: 'createempleado', component:CrearempleadoComponent},
  { path: 'listarempleados', component:ListarempleadoComponent},
  { path: 'editarempleado/:id', component:EditarempleadoComponent},
  { path: 'createproyectoempleado', component:CrearproyectoempleadoComponent},
  { path: 'listarempleadosproyectos', component:ListarproyectoempleadoComponent},
  { path: 'createjefe', component:CreatejefeComponent},
  { path: 'listarjefes', component:ListarjefeComponent},
  { path: 'listartareas', component:ListartareaComponent},
  { path: 'createtarea', component:CreartareaComponent},
  { path: 'editartarea/:id', component:EditarComponent},
  { path: 'consultartareasempleadoconfecha', component:LoginconsultaComponent},
  { path: 'loginingresoempleado', component:LoginingresoempleadoComponent},
  { path: 'loginingresojefe', component:LoginingresojefeComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
