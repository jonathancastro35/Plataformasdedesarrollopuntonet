import { Component, OnInit } from '@angular/core';
import { TareaService } from 'src/app/Services/tarea.service';

@Component({
  selector: 'app-listartarea',
  templateUrl: './listartarea.component.html',
  styleUrls: ['./listartarea.component.css']
})
export class ListartareaComponent implements OnInit{

  Listartareas:any = [];

  ngOnInit(){
    this.loadlistartareas();
  }

  constructor(public tareasservice:TareaService){}

  loadlistartareas(){
  return this.tareasservice.Gettareas().subscribe((data:{}) => {
    this.Listartareas= data;
  })
  }

  deletetarea(id:number){

  if(confirm('En caso de eliminar la tarea?')){
    this.tareasservice.Deletetarea(id)
    .subscribe(res => {
      this.loadlistartareas();
    });
  }
  }

}

































