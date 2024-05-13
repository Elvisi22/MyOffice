export class EditReservation {
    reservationStartDate : Date
    reservationEndDate : Date
    employeeId : number
    placeId : number;

    constructor(reservationStartDate : Date,
        reservationEndDate : Date,
        employeeId : number,
        placeId : number,){

            this.reservationStartDate = reservationStartDate,
            this.reservationEndDate = reservationEndDate,
            this.employeeId = employeeId,
            this.placeId = placeId;

    }
}