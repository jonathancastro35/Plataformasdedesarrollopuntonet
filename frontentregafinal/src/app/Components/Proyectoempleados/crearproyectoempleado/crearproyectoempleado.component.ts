import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService } from 'src/app/Services/proyecto.service';
import { EmpleadoService } from 'src/app/Services/empleado.service';
import { EmpleadoproyectoService } from 'src/app/Services/empleadoproyecto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crearproyectoempleado',
  templateUrl: './crearproyectoempleado.component.html',
  styleUrls: ['./crearproyectoempleado.component.css']
})

export class CrearproyectoempleadoComponent implements OnInit{

  proyectoempForm:any=FormGroup;
  Listadoempleados:any = [];
  Listadoproyecto:any = [];

  ngOnInit(){
    this.listadoempleados();
    this.listadoproyectos();
    this.create(); 
  }

  constructor(
    public fb: FormBuilder,
    private ngZone:NgZone,
    private router:Router,
    public proyectoservice:ProyectoService,
    public empleadoservice:EmpleadoService,
    public empleadoproyectoService:EmpleadoproyectoService
  ){}

  listadoempleados(){
    return this.empleadoservice.Getempleados().subscribe((data:{}) => {
      this.Listadoempleados = data
    })
  }

  listadoproyectos(){
    return this.proyectoservice.Getproyectos().subscribe((data:{}) => {
      this.Listadoproyecto = data
    })
  }
 

  create(){
    this.proyectoempForm = this.fb.group({
      Idempleado:['', Validators.required],
      Idproyecto:['', Validators.required]
    });
  }

  submitForm(){

    this.empleadoproyectoService.Createproyectoempleado(this.proyectoempForm.value).subscribe((res) =>{
      console.log('Proyecto empleado creado!');
      this.ngZone.run(() => this.router.navigateByUrl('/listarproyectos'));
    });
}

}






  



  



