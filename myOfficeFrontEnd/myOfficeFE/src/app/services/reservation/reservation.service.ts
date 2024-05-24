import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { EditReservation } from 'src/app/model/EditReservation';
import { Reservation } from 'src/app/model/Reservation';
import { ReservationInfo } from 'src/app/model/ReservationInfo';
import { SaveReservationDTO } from 'src/app/model/SaveReservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http : HttpClient) { }
  
  private url = "http://localhost:8080";


  getAllReservations():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/get-all-reservations`);
    
  }

  getUserReservations(id : number):Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/get-user-reservations/${id}`)
  }

  getReservationCount(id:number):Observable<number>{
    return this.http.get<any>(`${this.url}/countReservationsForUser?id=${id}`)
  }



  createReservation(reservationDto : SaveReservationDTO): Observable <SaveReservationDTO>{
    return this.http.post<SaveReservationDTO>(`${this.url}/create-reservation` , reservationDto).
    pipe(
      catchError(this.handleError)
      
    );

  }

  todayReservation(userId : number): Observable <ReservationInfo>{
    const url = `${this.url}/today/${userId}`;
    return this.http.get<ReservationInfo>(url);
  }




  checkReservation(inputedDate: Date, userId: number): Observable<Reservation>{
    const dateString = inputedDate.toISOString().slice(0, 10);
    const url = `${this.url}/check?date=${dateString}&userId=${userId}`;
    return this.http.get<Reservation>(url);

  }

  avlb(placeId : number):Observable<any>{
    const url = `${this.url}/availability?placeId=${placeId}`
    return this.http.get<any>(url)
  }

  bookedOrNo(placeId : number) : Observable<any>{
    const url = `${this.url}/bookedOrNo?placeId=${placeId}`
    return this.http.get<any>(url)
  }


  getAllReservationsForSelectedSeat(placeId : number):Observable<any>{
    const url = `${this.url}/placeReservations?placeId=${placeId}`
    return this.http.get<any>(url)
  }



  // private handleError(error: any) {
  //   console.error('An error occurred:', error);
  //   return throwError('Something went wrong; please try again later.');
  // }

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


  updateReservation(id: number, editReservation: EditReservation): Observable<any> {
    return this.http.put(`${this.url}/update-reservation/${id}`, editReservation).pipe(
      catchError(this.handleError)
    );
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.url}/get-reservation-by-id/${id}`);
  }

  
  deleteReservationById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete-reservation-by-id/${id}`);
  }




}
