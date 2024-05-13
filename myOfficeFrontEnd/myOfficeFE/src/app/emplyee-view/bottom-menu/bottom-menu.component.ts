import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDeletionComponent } from 'src/app/dialogs/dialog-deletion/dialog-deletion.component';
import { DialogEditReservationComponent } from 'src/app/dialogs/dialog-edit-reservation/dialog-edit-reservation.component';
import { Reservation } from 'src/app/model/Reservation';
import { ReservationService } from 'src/app/services/reservation/reservation.service';


@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss']
})
export class BottomMenuComponent {
  reservations:any[] = [];
  displayedColumns: string[] = [ 'reservation_start_date', 'reservation_end_date'  ];
  dataSource = this.reservations;
  
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomMenuComponent> , private reservationService : ReservationService , public dialog: MatDialog,
    ){
    this.getAllReservations();
  }

  openLink(event: MouseEvent): void {
    this.getAllReservations();
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }


  getAllReservations(){
    this.reservationService.getAllReservations().subscribe((
      response:any[])=>{
          this.dataSource= response;
          console.log(this.reservations)
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

}
