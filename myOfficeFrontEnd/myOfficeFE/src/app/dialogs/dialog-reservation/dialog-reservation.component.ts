import { BooleanInput } from '@angular/cdk/coercion';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DateAdapter } from '@angular/material/core';
import { DateRange, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BottomMenuComponent } from 'src/app/emplyee-view/bottom-menu/bottom-menu.component';
import { Employee } from 'src/app/model/Employee';
import { Place } from 'src/app/model/Place';
import { Reservation } from 'src/app/model/Reservation';
import { SaveReservationDTO } from 'src/app/model/SaveReservation';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-dialog-reservation',
  templateUrl: './dialog-reservation.component.html',
  styleUrls: ['./dialog-reservation.component.scss']
})
export class DialogReservationComponent implements OnInit {
  reservationForm!: FormGroup;
  id!: number;
  minDate: string = new Date().toISOString().split('T')[0];
  avlbDate! : string;
  selectedSeat! : number;
  booked! : string;
  today :Date;
  maxDate!: Date;
  reservations:any;
  reservedOrNo! : string;
  
 

  constructor(private formBuilder: FormBuilder , private reservationService : ReservationService , 
    private authService : AuthService , @Inject(MAT_DIALOG_DATA) private data: any, public dialog: MatDialog, private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar, 
    
    ) { 
      this.selectedSeat = this.data.id;
      this.today=new Date();
      this.maxDate = new Date(this.today.getTime() + (5 * 24 * 60 * 60 * 1000));
      console.log(this.today)
     
    }

  ngOnInit(): void {
    console.log(this.authService.getCurrentUserIdFromLocalStorage())
    this.getAllReservations();
    this.initializeForm(); 
    this.getAvlb(this.selectedSeat);
    this.bookedOrNo(this.selectedSeat);
   
   
    
  }

  initializeForm(): void {
    this.reservationForm = this.formBuilder.group({
      reservation_start_date: ['', Validators.required],
      reservation_end_date: ['', Validators.required],
      employee: [this.authService.getCurrentUserIdFromLocalStorage(), Validators.required], 
      place: [this.id = this.data.id, Validators.required]    
    });
  }

  createReservation() {
    if (this.reservationForm.valid) {
      let employee : Employee = new Employee(this.reservationForm.get('employee')?.value)
      let place : Place = new Place(this.reservationForm.get('place')?.value)
      let reservation : SaveReservationDTO = new SaveReservationDTO(this.reservationForm.get('reservation_start_date')?.value , 
      this.reservationForm.get('reservation_end_date')?.value , employee , place)
      console.log(reservation)
      this.reservationService.createReservation(reservation).subscribe( ()=> {
        this.openSnackBar();
        console.log('Reservation updated successfully');
        this.dialog.closeAll();

       setTimeout(function() {
      window.location.reload();
        }, 1000); // 1500 milliseconds = 1.5 seconds

        
       
      },
      error => {
        
        console.error('Error updating reservation', error);
      }
    );
      
     
    } else {
      console.log('Form is invalid');
    }
  }



    getAvlb(placeId: number): void {
      this.reservationService.avlb(placeId).subscribe(
        (avlbDate: string) => {
          // This function is called when the HTTP request is successful
          this.avlbDate = avlbDate;
          console.log('Availability date:', avlbDate);
          // You can perform any further actions with the availability date here
        },
        (error) => {
          // This function is called if there's an error with the HTTP request
          console.error('Error getting availability date:', error);
          // You can handle errors here, such as displaying an error message to the user
        }
      );
    }


    bookedOrNo(placeId : number) : void {
      this.reservationService.bookedOrNo(placeId).subscribe(
        (booked : boolean)=>{
          if(booked == true){
            this.booked = "Available"
          }else if(booked == false){
            this.booked = "Not Available"
          }
          
          console.log(booked)
        },
        (error)=>{
          console.error(error)
        }
      );

    }

    isWeekend(date: Date): boolean {
      const day = date.getDay();
      return day === 0 || day === 6; // Sunday (0) or Saturday (6)
    }
    
  

 


  openSnackBar() {
    this._snackBar.open('Reservation was sucessfuly', 'Close', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }


  cancel(){
    this.dialog.closeAll();
  }


  isReservedDay: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (this.isWeekend(cellDate)) {
      return 'weekend'; // Apply 'weekend' CSS class to disable weekends
    }
    // Check if the view is 'month' and if the cellDate is a weekend
    if (view === 'month' && (cellDate.getDay() === 0 || cellDate.getDay() === 6)) {
        return 'weekend'; // Return 'weekend' CSS class for weekend days
    }

    // Check if the view is 'month'
    if (view === 'month') {
        const currentDate = cellDate; 

        // Loop through reservations
        for (const reservation of this.reservations) {
            const startDate = new Date(reservation.reservation_start_date); 
            const endDate = new Date(reservation.reservation_end_date); 

            // Check if the currentDate falls within the reservation period
            if (currentDate >= startDate && currentDate <= endDate) {
                console.log('Date is within reservation period');
                this.reservedOrNo = "reserved-date";
                return 'reserved-date'; // Return 'reserved-date' CSS class for reserved days
                
            }
        }
    }
    
    return ''; // Return empty string if the date is not reserved or a weekend
};






getAllReservations() {
 console.log("seattttt " +this.selectedSeat)
  this.reservationService.getAllReservationsForSelectedSeat(this.selectedSeat).subscribe((
    response: any[]) => {
      this.reservations = response;
      console.log('Reservations:', this.reservations);
    },
    error => {
      console.error('Error getting reservations', error);
    }
  );
}

  

  

  


}
