export class ReservationInfo{
    reservationStartDate : Date
    reservationEndDate : Date
    employeeId : number
    placeId : number;
    placeNumber : number

    constructor(reservationStartDate : Date,
        reservationEndDate : Date,
        employeeId : number,
        placeId : number,
        placeNumber: number){

            this.reservationStartDate = reservationStartDate,
            this.reservationEndDate = reservationEndDate,
            this.employeeId = employeeId,
            this.placeId = placeId,
            this.placeNumber = placeNumber;

    }
}