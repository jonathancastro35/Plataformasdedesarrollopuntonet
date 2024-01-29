import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/Services/proyecto.service';

@Component({
  selector: 'app-listarproyecto',
  templateUrl: './listarproyecto.component.html',
  styleUrls: ['./listarproyecto.component.css']
})
export class ListarproyectoComponent implements OnInit{

  Listarproyectos:any = [];

  ngOnInit(){
    this.loadlistarproyectos();
  }

  constructor(public proyectoservice:ProyectoService){}

  loadlistarproyectos(){
  return this.proyectoservice.Getproyectos().subscribe((data:{}) => {
    this.Listarproyectos = data;
  })
  }

  deleteproyecto(id:number){

  if(confirm('Esta seguro de eliminar el proyecto')){
    this.proyectoservice.Deleteproyecto(id)
    .subscribe(res => {
      this.loadlistarproyectos();
    });
  }
  }

}






























