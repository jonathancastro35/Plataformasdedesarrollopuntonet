import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/Services/empleado.service';
import { Empleado } from 'src/app/Modelo/empleado';

@Component({
  selector: 'app-editarempleado',
  templateUrl: './editarempleado.component.html',
  styleUrls: ['./editarempleado.component.css']
})

export class EditarempleadoComponent implements OnInit{

  Listadoempleados:any = [];

  empleado:Empleado={
    id:0,
    Nombre:'',
    Apellidos:'',
    Usuario:'',
    Pass:''
    
  }

  constructor(private readonly empleadoService:EmpleadoService,
    private readonly router: Router, private readonly aRoute: ActivatedRoute){}

    ngOnInit(): void{
      this.aRoute.params.subscribe(
        params => {
          this.getempleado(params['id']);
        }
      );
     
    }

    getempleado(id:number){
      this.empleadoService.Getempleado(id).subscribe(
      data =>{
        this.empleado = data;
      }
      );
    }


      update(){
        this.empleadoService.Updateempleado(this.empleado).subscribe(
          () => {
            this.router.navigate(["loginingresojefe"])
          }
        );
      }

}






