import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from 'src/app/Services/proyecto.service';
import { Proyecto } from 'src/app/Modelo/proyecto';

@Component({
  selector: 'app-editarproyecto',
  templateUrl: './editarproyecto.component.html',
  styleUrls: ['./editarproyecto.component.css']
})
export class EditarproyectoComponent implements OnInit{

  Listadoproyectos:any = [];

  proyecto:Proyecto={
    id:0,
    Nombreproyecto:'',
    Descripcionproyecto:'',
    
  }

  constructor(private readonly proyectoService :ProyectoService,
    private readonly router: Router, private readonly aRoute: ActivatedRoute){}

    ngOnInit(): void{
      this.aRoute.params.subscribe(
        params => {
          this.getproyecto(params['id']);
        }
      );
     
    }

    getproyecto(id:number){
      this.proyectoService.Getproyecto(id).subscribe(
      data =>{
        this.proyecto = data;
      }
      );
    }


      update(){
        this.proyectoService.Updateproyecto(this.proyecto).subscribe(
          () => {
            this.router.navigate(["listarproyectos"])
          }
        );
      }

}




