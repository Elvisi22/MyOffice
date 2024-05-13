import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { DialogDeletionComponent } from 'src/app/dialogs/dialog-deletion/dialog-deletion.component';
import { DialogEditReservationComponent } from 'src/app/dialogs/dialog-edit-reservation/dialog-edit-reservation.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { SeatsService } from 'src/app/services/seats/seats.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {

  reservations:any[] = [];
  displayedColumns: string[] = [ 'reservation_start_date', 'reservation_end_date'  ];
  dataSource = this.reservations;
  showDiv = false;
  selectedReservation: any;

  constructor(
    public dialog: MatDialog,
    public authService : AuthService,
    public seatService : SeatsService ,
    private reservationService : ReservationService ,
    private router : Router
    ) {
      this.getAllReservations();
    }


  getAllReservations(){
    this.reservationService.getAllReservations().subscribe((
      response:any[])=>{
          this.dataSource= response;
          console.log(this.dataSource)
      },
      error =>{
        console.error('Error getting data' , error)
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


  toggleDiv(id:number){
    
    this.reservationService.getReservationById(id)
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



navigateToNewComponent(id: string) {
  this.router.navigate(['/reservation-view', id]);
}
}
