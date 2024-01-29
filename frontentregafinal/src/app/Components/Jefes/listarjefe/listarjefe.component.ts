import { Component, OnInit } from '@angular/core';
import { JefeService } from 'src/app/Services/jefe.service';

@Component({
  selector: 'app-listarjefe',
  templateUrl: './listarjefe.component.html',
  styleUrls: ['./listarjefe.component.css']
})
export class ListarjefeComponent implements OnInit{

  Listarjefes:any = [];

  ngOnInit(){
    this.loadlistajefes();
  }

  constructor(public jefesservices:JefeService){}

  loadlistajefes(){
  return this.jefesservices.Getjefes().subscribe((data:{}) => {
    this.Listarjefes = data;
  })
  }

}































