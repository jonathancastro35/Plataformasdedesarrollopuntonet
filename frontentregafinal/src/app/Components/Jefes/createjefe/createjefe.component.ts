import { Component, OnInit, NgZone } from '@angular/core';
import { JefeService } from 'src/app/Services/jefe.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createjefe',
  templateUrl: './createjefe.component.html',
  styleUrls: ['./createjefe.component.css']
})

export class CreatejefeComponent implements OnInit{

  jefeForm:any=FormGroup;

  ngOnInit(){
    this.addjefelista();
  }
  
  constructor(
    public fb: FormBuilder,
    private ngZone:NgZone,
    private router:Router,
    public jefeservice:JefeService
  ){}

  
  addjefelista(){
    this.jefeForm = this.fb.group({
      Nombre:['', Validators.required],
      Apellidos:['', Validators.required],
      Usuario:['', Validators.required],
      Pass:['', Validators.required],
    });
  }


  submitForm(){
    this.jefeservice.Createjefe(this.jefeForm.value).subscribe((res) =>{
      console.log('Jefe agregado!');
      this.ngZone.run(() => this.router.navigateByUrl('/loginingresojefe'));
    });
  }

}














































