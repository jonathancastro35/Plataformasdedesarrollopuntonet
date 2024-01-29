import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from '../Modelo/empleado';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class EmpleadoService {

 
  private endpoint:string = environment.endPointempleado;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',   
    }),
  };

  
  Createempleado(data:any):Observable<Empleado>{
    return this.http
    .post<Empleado>(
     this.endpoint.concat("/"),JSON.stringify(data),
     this.httpOptions 
    )
    .pipe(retry(1),catchError(this.errorHandl))
    }

    Getempleado(id:number): Observable<Empleado>{
    return this.http
    .get<Empleado>(this.endpoint.concat("/")+id)
    .pipe(retry(1), catchError(this.errorHandl));
    }

    Getempleados(): Observable<Empleado> {
      return this.http.get<Empleado>(this.endpoint)
      .pipe(retry(1), catchError(this.errorHandl));
    }

    Updateempleado(data:Empleado):Observable<Empleado>{
      return this.http
      .put<Empleado>(this.endpoint.concat("/")+data.id, data)
      .pipe(
        retry(1), 
      catchError(() => {
        return throwError(() => new Error(this.httpError()))
      })
      );
    }

    Deleteempleado(id:number){
      return this.http
      .delete<Empleado>(this.endpoint.concat("/")+id,this.httpOptions)
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
