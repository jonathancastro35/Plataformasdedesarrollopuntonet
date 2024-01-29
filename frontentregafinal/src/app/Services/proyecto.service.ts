import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Proyecto } from '../Modelo/proyecto';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProyectoService {

  private endpoint:string = environment.endPointproyecto;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',   
    }),
  };

  
  Createproyecto(data:any):Observable<Proyecto>{
    return this.http
    .post<Proyecto>(
     this.endpoint.concat("/"),JSON.stringify(data),
     this.httpOptions 
    )
    .pipe(retry(1),catchError(this.errorHandl))
    }

    Getproyecto(id:number): Observable<Proyecto>{
    return this.http
    .get<Proyecto>(this.endpoint.concat("/")+id)
    .pipe(retry(1), catchError(this.errorHandl));
    }

    Getproyectos(): Observable<Proyecto> {
      return this.http.get<Proyecto>(this.endpoint)
      .pipe(retry(1), catchError(this.errorHandl));
    }

    Updateproyecto(data:Proyecto):Observable<Proyecto>{
      return this.http
      .put<Proyecto>(this.endpoint.concat("/")+data.id, data)
      .pipe(
        retry(1), 
      catchError(() => {
        return throwError(() => new Error(this.httpError()))
      })
      );
    }

    Deleteproyecto(id:number){
      return this.http
      .delete<Proyecto>(this.endpoint.concat("/")+id,this.httpOptions)
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
































