import { Component, OnInit, NgZone } from '@angular/core';
import { LoginempleadoService } from 'src/app/Services/loginempleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginingresoempleado',
  templateUrl: './loginingresoempleado.component.html',
  styleUrls: ['./loginingresoempleado.component.css']
})

export class LoginingresoempleadoComponent implements OnInit{

  ingresoempleadoForm:any=FormGroup;
  Listado:any = [];

  ngOnInit(){
    this.addusuariologin();
    this.listado();
  }

  constructor(
    public fb: FormBuilder,
    private ngZone:NgZone,
    private router:Router,
    public loginempleadoService:LoginempleadoService
  ){}

  addusuariologin(){
    return this.ingresoempleadoForm= this.fb.group({
      Usuario:['', Validators.required],
      Pass:['', Validators.required]
    });
  }

  listado(){
    return this.loginempleadoService.Register(this.ingresoempleadoForm.value).subscribe((data:{}) => {
      this.Listado = data;
    })
    }

}

























