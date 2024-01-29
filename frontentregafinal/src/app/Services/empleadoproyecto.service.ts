import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Proyectoempleado } from '../Modelo/proyectoempleado';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoproyectoService {

  private endpoint:string = environment.endPointempleadoproyecto;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',   
    }),
  };

  
  Createproyectoempleado(data:any):Observable<Proyectoempleado>{
    return this.http
    .post<Proyectoempleado>(
     this.endpoint.concat("/"),JSON.stringify(data),
     this.httpOptions 
    )
    .pipe(retry(1),catchError(this.errorHandl))
    }

    Getproyectoempleado(id:number): Observable<Proyectoempleado>{
    return this.http
    .get<Proyectoempleado>(this.endpoint.concat("/")+id)
    .pipe(retry(1), catchError(this.errorHandl));
    }

    Getproyectosempleados(): Observable<Proyectoempleado> {
      return this.http.get<Proyectoempleado>(this.endpoint)
      .pipe(retry(1), catchError(this.errorHandl));
    }

    Updateproyectoempleado(data:Proyectoempleado):Observable<Proyectoempleado>{
      return this.http
      .put<Proyectoempleado>(this.endpoint.concat("/")+data.id, data)
      .pipe(
        retry(1), 
      catchError(() => {
        return throwError(() => new Error(this.httpError()))
      })
      );
    }

    Deleteproyectoempleado(id:number){
      return this.http
      .delete<Proyectoempleado>(this.endpoint.concat("/")+id,this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
    }

  errorHandl(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  httpError(){
    return "Se ha producido un error en la aplicación consulte al administrador"
  }
}






















