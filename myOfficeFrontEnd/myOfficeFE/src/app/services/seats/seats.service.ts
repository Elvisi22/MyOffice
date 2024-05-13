import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  constructor(private http : HttpClient) { }

  private url = "http://localhost:8080";

  getAllPlaces():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/get-all-seats`);
  }
}
