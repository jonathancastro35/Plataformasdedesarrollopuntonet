import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarea } from '../Modelo/tarea';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TareaService {

  private endpoint:string = environment.endPointtarea;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',   
    }),
  };

  
  Createtarea(data:any):Observable<Tarea>{
    return this.http
    .post<Tarea>(
     this.endpoint.concat("/"),JSON.stringify(data),
     this.httpOptions 
    )
    .pipe(retry(1),catchError(this.errorHandl))
    }

    Gettarea(id:number): Observable<Tarea>{
    return this.http
    .get<Tarea>(this.endpoint.concat("/")+id)
    .pipe(retry(1), catchError(this.errorHandl));
    }

    Gettareas(): Observable<Tarea> {
      return this.http.get<Tarea>(this.endpoint)
      .pipe(retry(1), catchError(this.errorHandl));
    }

    Updatetarea(data:Tarea):Observable<Tarea>{
      return this.http
      .put<Tarea>(this.endpoint.concat("/")+data.Id, data)
      .pipe(
        retry(1), 
      catchError(() => {
        return throwError(() => new Error(this.httpError()))
      })
      );
    }

    Deletetarea(id:number){
      return this.http
      .delete<Tarea>(this.endpoint.concat("/")+id,this.httpOptions)
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




























