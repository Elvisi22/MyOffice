import { Employee } from "./Employee"
import { Place } from "./Place"

export class SaveReservationDTO{
reservation_start_date: Date 
  reservation_end_date: Date   
  employee: Employee
  place : Place

  constructor(reservation_start_date: Date, 
    reservation_end_date: Date,   
    employee: Employee,
    place : Place){
        this.reservation_start_date =reservation_start_date;
        this.reservation_end_date = reservation_end_date;
        this.employee= employee;
        this.place = place;
    }
}