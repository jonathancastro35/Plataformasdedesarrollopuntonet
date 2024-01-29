import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginconsultaempleado } from '../Modelo/loginconsultaempleado';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LoginconsultaempService {

  private endpoint:string = environment.endPointloginconsultar;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',   
    }),
  };

  Register(data:any):Observable<loginconsultaempleado>{
    return this.http
    .post<loginconsultaempleado>(
     this.endpoint.concat("/"),JSON.stringify(data),
     this.httpOptions 
    )
    .pipe(retry(1),catchError(this.errorHandl))
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


























