import { Component, OnInit, NgZone } from '@angular/core';
import { LoginconsultaempService } from 'src/app/Services/loginconsultaemp.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginconsulta',
  templateUrl: './loginconsulta.component.html',
  styleUrls: ['./loginconsulta.component.css']
})

export class LoginconsultaComponent implements OnInit{

  usuariologinconsultaForm:any=FormGroup;
  Listado:any = [];

  ngOnInit(){
    this.addusuariologin();
    this.listado();
  }

  constructor(
    public fb: FormBuilder,
    private ngZone:NgZone,
    private router:Router,
    public loginconsultaempService:LoginconsultaempService
  ){}

  addusuariologin(){
    return this.usuariologinconsultaForm= this.fb.group({
      Usuario:['', Validators.required],
      Pass:['', Validators.required],
      Fechatarea:['', Validators.required]
    });
  }

  listado(){
    return this.loginconsultaempService.Register(this.usuariologinconsultaForm.value).subscribe((data:{}) => {
      this.Listado = data;
    })
    }

}


























