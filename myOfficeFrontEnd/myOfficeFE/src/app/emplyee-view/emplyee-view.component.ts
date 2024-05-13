import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogReservationComponent } from '../dialogs/dialog-reservation/dialog-reservation.component';
import { AuthService } from '../services/auth/auth.service';
import { SeatsService } from '../services/seats/seats.service';
import { MessageService } from 'primeng/api';
import { ReservationService } from '../services/reservation/reservation.service';
import { DialogEditReservationComponent } from '../dialogs/dialog-edit-reservation/dialog-edit-reservation.component';
import { DialogDeletionComponent } from '../dialogs/dialog-deletion/dialog-deletion.component';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Reservation } from '../model/Reservation';
import { tap } from 'rxjs';


@Component({
  selector: 'app-emplyee-view',
  templateUrl: './emplyee-view.component.html',
  styleUrls: ['./emplyee-view.component.scss']
})
export class EmplyeeViewComponent implements OnInit{
  
  selected: Date | null = null;
  currentUser: any;
  places : any[] = [];
  userId! : number ;

  
  //..................
  reservations:any = null;
  rsv! : Reservation ;
  displayedColumns: string[] = [ 'reservation_start_date', 'reservation_end_date'  ];
  dataSource = this.reservations;

  //............
  selectedValue: string = 'green';
  showDiv = false;
  ///
  selectedReservation : any;


  
  
  


ngOnInit(): void {
  this.getCurrentUser();
  this.getAllPlaces();
  
}

  

  constructor(private _bottomSheet: MatBottomSheet , 
    public dialog: MatDialog,
    public authService : AuthService,
    public seatService : SeatsService ,
    private reservationService : ReservationService 
    ) {
      this.getAllReservations();
      
    }
  
  
    
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string , id : number) {
    console.log("open");
    
    this.dialog.open(DialogReservationComponent, {
      width: '310px', 
      height: '380px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id: id }
    });
  }


  

  getCurrentUser(){
    this.currentUser = this.authService.getCurrentUserFromLocalStorage();
    
    
    console.log(this.currentUser.id)
  }


  getAllPlaces(){
    this.seatService.getAllPlaces().subscribe(
      seats => {
        this.places = seats;
      }
    )
  }



 

  getAllReservations() {
    const user  = this.authService.getCurrentUserFromLocalStorage();
    this.reservationService.getUserReservations(user.id).subscribe((
      response: any[]) => {
        this.reservations = response;
        console.log('Reservations:', this.reservations);
      },
      error => {
        console.error('Error getting reservations', error);
      }
    );
  }
  


  updateReservation(id : number){
    this.dialog.open(DialogEditReservationComponent, {
      width: '400px', 
      height: '270px',
      data: { id: id }
    });
  }


  deleteReservtion(id:number){
    this.dialog.open(DialogDeletionComponent, {
      width: '400px', 
      height: '122px',
      data: { id: id }
    });
  }

  
  getColor(): string {
   
    if (this.selectedValue === 'value1') {
      return 'green'; 
    } else if (this.selectedValue === 'value2') {
      return 'blue'; 
    } else {
      return 'red'; 
    }
  }


 

  isEvenDay: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const dayOfMonth = cellDate.getDate();
      return dayOfMonth % 2 === 0 ? 'even-date' : 'odd-date';
    }
    return '';
  };


  isReservedDay: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
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
                return 'reserved-date'; // Return 'reserved-date' CSS class for reserved days
            }
        }
    }
    
    return ''; // Return empty string if the date is not reserved or a weekend
};

  

  


  weekendDisable(date: Date): boolean {
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6; // Return true if not Sunday (0) or Saturday (6)
  }


  toggleDiv(id : number){
    console.log("pc place number " + id)
    this.showDiv = !this.showDiv;
    
  }

  // Define method to handle calendar click event
handleCalendarClick(date: number | any) {
  this.reservationService.checkReservation(date , this.currentUser.id)
    .pipe(
      tap(
        (res)=>{
          this.selectedReservation=res
          console.log(this.selectedReservation)
        }
      )

    
    ).subscribe((
      response:any)=>{
        
      },
      error =>{
        console.error('Error getting data' , error)
      }
      );
      this.showDiv = !this.showDiv;


}




 



  
  
  

}
