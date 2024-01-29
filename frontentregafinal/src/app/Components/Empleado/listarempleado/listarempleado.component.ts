import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/Services/empleado.service';

@Component({
  selector: 'app-listarempleado',
  templateUrl: './listarempleado.component.html',
  styleUrls: ['./listarempleado.component.css']
})
export class ListarempleadoComponent implements OnInit{

  Listarempleados:any = [];

  ngOnInit(){
    this.loadlistarempleado();
  }

  constructor(public empleadoservice:EmpleadoService){}

  loadlistarempleado(){
  return this.empleadoservice.Getempleados().subscribe((data:{}) => {
    this.Listarempleados = data;
  })
  }

  deleteempleado(id:number){

  if(confirm('Si el empleado, està en algùn proyecto, no se eliminarà')){
    this.empleadoservice.Deleteempleado(id)
    .subscribe(res => {
      this.loadlistarempleado();
    });
  }
  }

}






























