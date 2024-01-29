import { Component, OnInit } from '@angular/core';
import { EmpleadoproyectoService } from 'src/app/Services/empleadoproyecto.service';

@Component({
  selector: 'app-listarproyectoempleado',
  templateUrl: './listarproyectoempleado.component.html',
  styleUrls: ['./listarproyectoempleado.component.css']
})

export class ListarproyectoempleadoComponent implements OnInit{

  Listarproyectosempleado:any = [];

  ngOnInit(){
    this.loadlistarproyectosempleados();
  }

  constructor(public empleadoproyectoservice:EmpleadoproyectoService){}

  loadlistarproyectosempleados(){
  return this.empleadoproyectoservice.Getproyectosempleados().subscribe((data:{}) => {
    this.Listarproyectosempleado = data;
  })
  }

  deleteproyectoempleado(id:number){

  if(confirm('En caso de poseer tareas no se elimininarà')){
    this.empleadoproyectoservice.Deleteproyectoempleado(id)
    .subscribe(res => {
      this.loadlistarproyectosempleados();
    });
  }
  }

}































