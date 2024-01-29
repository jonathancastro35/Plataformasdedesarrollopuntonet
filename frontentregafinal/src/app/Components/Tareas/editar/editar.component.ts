import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoproyectoService } from 'src/app/Services/empleadoproyecto.service';
import { TareaService } from 'src/app/Services/tarea.service';
import { Tarea } from 'src/app/Modelo/tarea';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit{

  Listadoproyectosempleados:any = [];
  
  str:string = '2000-01-01';
  date:Date = new Date(this.str)

  tarea:Tarea={
    Id:0,
    Idproyectoempleado:0,
    Fechatarea:this.date,
    Horaentrada:8,
    Horasalida:17,
    Nombretarea:'',
    Tiempodedicadotarea:1
    
  }

  constructor(private readonly proyectoempleadoservice:EmpleadoproyectoService,
    private readonly  tareaservice:TareaService, 
    private readonly router: Router, private readonly aRoute: ActivatedRoute){}

    ngOnInit(): void{
      this.aRoute.params.subscribe(
        params => {
          this.gettarea(params['id']);
        }
      );

      this.loadlistarempleadosusuarios();
      
    }

    gettarea(id:number){
      this.tareaservice.Gettarea(id).subscribe(
      data =>{
        this.tarea = data;
      }
      );
    }

    loadlistarempleadosusuarios(){
      return this.proyectoempleadoservice.Getproyectosempleados().subscribe((data:{}) => {
        this.Listadoproyectosempleados = data;
      })
      }

      update(){
        this.tareaservice.Updatetarea(this.tarea).subscribe(
          () => {
            this.router.navigate(["loginingresojefe"])
          }
        );
      }

}








