import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CreateEmployeeReq } from 'src/app/model/CreateEmployeeReq';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080';
  private readonly USER = 'currentUser';

  constructor(private http: HttpClient) { }


  login(email : string , password : string) : Observable<any> {
    const body = {email , password};
    return this.http.post<any>(`${this.url}/login`,body).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error ${error.status}: ${error.statusText}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  logout():void{
    localStorage.clear();
  }

  saveUserToocalStorage(user : any){
    localStorage.setItem(this.USER , JSON.stringify(user))

  }

  getCurrentUserFromLocalStorage(): any{
    const userJson = localStorage.getItem(this.USER);
    return userJson ? JSON.parse(userJson) : null;
  }


  isLoggedIn():boolean{
    const user = localStorage.getItem(this.USER);
    return !!user
  }

  isAdmin(): boolean{
    const user = JSON.parse(localStorage.getItem(this.USER) || '{}');
    return user.type === 'ADMIN'
  }

  

  getCurrentUserIdFromLocalStorage(): string | null {
    const userJson = localStorage.getItem(this.USER);
    const user = userJson ? JSON.parse(userJson) : null;
    return user ? user.id : null;
  }

  findUserById(id : number): Observable<CreateEmployeeReq>{
    return this.http.get<CreateEmployeeReq>(`${this.url}/find/${id}`);
  }


  
}
