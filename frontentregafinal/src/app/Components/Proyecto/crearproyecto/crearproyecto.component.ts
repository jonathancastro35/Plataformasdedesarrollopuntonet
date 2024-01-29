import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService } from 'src/app/Services/proyecto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crearproyecto',
  templateUrl: './crearproyecto.component.html',
  styleUrls: ['./crearproyecto.component.css']
})

export class CrearproyectoComponent implements OnInit{

  tareaForm:any=FormGroup;

  ngOnInit(){
   
    this.create(); 
  }

  constructor(
    public fb: FormBuilder,
    private ngZone:NgZone,
    private router:Router,
    public proyectoservice:ProyectoService,
    
  ){}


  create(){
    this.tareaForm = this.fb.group({
      Nombreproyecto:['', Validators.required],
      Descripcionproyecto:['', Validators.required],
    });
  }

  submitForm(){

    this.proyectoservice.Createproyecto(this.tareaForm.value).subscribe((res) =>{
      console.log('Proyecto creado!');
      this.ngZone.run(() => this.router.navigateByUrl('/listarproyectos'));
    });
}

}






  



  



