import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.post<any>(`${this.url}/login`,body);
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
