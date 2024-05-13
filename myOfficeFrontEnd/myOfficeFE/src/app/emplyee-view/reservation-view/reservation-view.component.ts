import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { SeatsService } from 'src/app/services/seats/seats.service';

@Component({
  selector: 'app-reservation-view',
  templateUrl: './reservation-view.component.html',
  styleUrls: ['./reservation-view.component.scss']
})
export class ReservationViewComponent implements OnInit{
 
  selectedReservation: any;
  id!:number;

  constructor(
    public dialog: MatDialog,
    public authService : AuthService,
    public seatService : SeatsService ,
    private reservationService : ReservationService ,
    private route: ActivatedRoute
    ) {
      
    }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      
    });
  }


  //   getReservationInfo(){
    
  //     this.reservationService.getReservationById(id)
  //     .pipe(
  //       tap(
  //         (res)=>{
  //           this.selectedReservation=res
  //           console.log(this.selectedReservation)
  //         }
  //       )
  
      
  //     ).subscribe((
  //       response:any)=>{
          
  //       },
  //       error =>{
  //         console.error('Error getting data' , error)
  //       }
  //       );
        
  // }

}
