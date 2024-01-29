import { Component, OnInit, NgZone } from '@angular/core';
import { LoginjefeService } from 'src/app/Services/loginjefe.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginingresojefe',
  templateUrl: './loginingresojefe.component.html',
  styleUrls: ['./loginingresojefe.component.css']
})

export class LoginingresojefeComponent implements OnInit{

  
  ingresojefeForm:any=FormGroup;
  Listado:any = [];

  ngOnInit(){
    this.addusuariologin();
    this.listado();
  }

  constructor(
    public fb: FormBuilder,
    private ngZone:NgZone,
    private router:Router,
    public loginempleado:LoginjefeService
  ){}

  addusuariologin(){
    return this.ingresojefeForm= this.fb.group({
      Usuario:['', Validators.required],
      Pass:['', Validators.required]
    });
  }

  listado(){
    return this.loginempleado.Register(this.ingresojefeForm.value).subscribe((data:{}) => {
      this.Listado = data;
    })
    }

}


























