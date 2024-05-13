import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CreateEmployeeReq } from 'src/app/model/CreateEmployeeReq';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  private url = "http://localhost:8080";



  getAllUsers():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/get-all-employees`)
  }


  createUser( createEmployee : CreateEmployeeReq) : Observable<CreateEmployeeReq>{
    return this.http.post<CreateEmployeeReq>(`${this.url}/create-user` , createEmployee).pipe
    (catchError(this.handleError))
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }


  updateUser(id:number , updateEmpt : CreateEmployeeReq) : Observable<void>{
    return this.http.put<void>(`${this.url}/update/employee/${id}` , updateEmpt).pipe(
      catchError(this.handleError)
    )
  }
}
