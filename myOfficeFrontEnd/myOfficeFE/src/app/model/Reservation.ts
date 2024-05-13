import { Employee } from "./Employee";
import { Place } from "./Place";

export interface Reservation{
// id:number;
reservation_start_date: Date;
reservation_end_date: Date;
employee: Employee;
place: Place;
}