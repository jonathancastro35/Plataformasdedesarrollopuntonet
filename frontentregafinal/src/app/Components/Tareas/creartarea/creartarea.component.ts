import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoproyectoService } from 'src/app/Services/empleadoproyecto.service';
import { TareaService } from 'src/app/Services/tarea.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-creartarea',
  templateUrl: './creartarea.component.html',
  styleUrls: ['./creartarea.component.css']
})

export class CreartareaComponent implements OnInit{

  tareaForm:any=FormGroup;
  
  Listadoproyectoempleado:any = [];

  ngOnInit(){
    this. listadoproyectosempleados();
    this.create(); 
  }

  constructor(
    public fb: FormBuilder,
    private ngZone:NgZone,
    private router:Router,
    public tareaservice:TareaService,
    public empleadoproyectoService:EmpleadoproyectoService
  ){}

  listadoproyectosempleados(){
    return this.empleadoproyectoService.Getproyectosempleados().subscribe((data:{}) => {
      this.Listadoproyectoempleado = data
    })
  }

  
  create(){
    this.tareaForm = this.fb.group({
      Idproyectoempleado:['', Validators.required],
      Fechatarea:['', Validators.required],
      Horaentrada:[8],
      Horasalida:[17],
      Nombretarea:['', Validators.required],
      Tiempodedicadotarea:[1, Validators.required]
    });
  }

  submitForm(){

    this.tareaservice.Createtarea(this.tareaForm.value).subscribe((res) =>{
      console.log('Tarea creada!');
      this.ngZone.run(() => this.router.navigateByUrl('/loginingresojefe'));
    });
}

}





  



  




