import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

       // TODO: better job of transforming error for user consumption
       console.log(`${operation} failed: ${error.message}`);

       // Let the app keep running by returning an empty result.
       return of(result as T);
    };
  }

  // GET ALL PATIENTS
  public getPatients(): Observable<any> {
    return this.httpClient.get(API_URL + '/patient').pipe(
      map(this.extractData)
    );
  }
  // GET ALL CLINICS
  public getClinics(): Observable<any> {
    return this.httpClient.get(API_URL + '/clinics').pipe(
      map(this.extractData)
    );
  }
}
