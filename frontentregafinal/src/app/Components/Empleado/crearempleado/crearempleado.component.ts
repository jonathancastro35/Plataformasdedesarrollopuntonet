import { Component, OnInit, NgZone } from '@angular/core';
import { EmpleadoService } from 'src/app/Services/empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearempleado',
  templateUrl: './crearempleado.component.html',
  styleUrls: ['./crearempleado.component.css']
})

export class CrearempleadoComponent implements OnInit{

  usuarioForm:any=FormGroup;

  ngOnInit(){
    this.addusuariolista();
  }
  
  constructor(
    public fb: FormBuilder,
    private ngZone:NgZone,
    private router:Router,
    public usuarioService:EmpleadoService
  ){}

  
  addusuariolista(){
    this.usuarioForm = this.fb.group({
      Nombre:['', Validators.required],
      Apellidos:['', Validators.required],
      Usuario:['', Validators.required],
      Pass:['', Validators.required],
    });
  }


  submitForm(){
    this.usuarioService.Createempleado(this.usuarioForm.value).subscribe((res) =>{
      console.log('Empleado agregado!');
      this.ngZone.run(() => this.router.navigateByUrl('/loginingresojefe'));
    });
  }

}













































