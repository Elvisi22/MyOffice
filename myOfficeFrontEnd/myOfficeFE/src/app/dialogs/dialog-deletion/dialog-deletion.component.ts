import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BottomMenuComponent } from 'src/app/emplyee-view/bottom-menu/bottom-menu.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-dialog-deletion',
  templateUrl: './dialog-deletion.component.html',
  styleUrls: ['./dialog-deletion.component.scss']
})
export class DialogDeletionComponent implements OnInit {

  constructor( private reservationService : ReservationService , 
    private authService : AuthService , @Inject(MAT_DIALOG_DATA) private data: any ,
    public dialog: MatDialog , private _bottomSheet: MatBottomSheet , private _snackBar: MatSnackBar){}
  ngOnInit(): void {
    console.log(this.data.id)
  }


Delete(){
  this.reservationService.deleteReservationById(this.data.id).subscribe( ()=> {
          
    console.log('Reservation updated successfully');
    this.reloadDialog();
    this.openSnackBar();
  },
  error => {
    
    console.error('Error updating reservation', error);
  }
);
}

reloadDialog(): void {
  setTimeout(function() {
    window.location.reload();
      }, 1000); // 1500 milliseconds = 1.5 seconds

  

 
}

openSnackBar() {
  this._snackBar.open('Reservation was  deleted sucessfuly', 'Close', {
    duration: 1000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });
}

Cancel(){
  this.dialog.closeAll();
}
     
}
