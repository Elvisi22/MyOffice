import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BottomMenuComponent } from 'src/app/emplyee-view/bottom-menu/bottom-menu.component';
import { EditReservation } from 'src/app/model/EditReservation';
import { Reservation } from 'src/app/model/Reservation';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-dialog-edit-reservation',
  templateUrl: './dialog-edit-reservation.component.html',
  styleUrls: ['./dialog-edit-reservation.component.scss']
})
export class DialogEditReservationComponent implements OnInit {

  reservationForm! : FormGroup



constructor(private formBuilder: FormBuilder , private reservationService : ReservationService , 
  private authService : AuthService , @Inject(MAT_DIALOG_DATA) private data: any , public dialogRef: MatDialogRef<BottomMenuComponent>,
  public dialog: MatDialog , private _bottomSheet: MatBottomSheet ,  private _snackBar: MatSnackBar){}

  
  ngOnInit(): void {
    this.initForm();
    this.populateForm();
  }
  initForm(): void {
    this.reservationForm = this.formBuilder.group({
      reservationStartDate: [''],
      reservationEndDate: [''],
      employeeId: [''],
      placeId: ['']
    });
  }
  populateForm(){
    this.reservationService.getReservationById(this.data.id).subscribe(
      reservation => {
        this.reservationForm.patchValue(reservation);
        console.log(reservation)
      }, error =>{
        console.error("Error patching values" , error)
      }
    );
  }
  
  update(){
    if (this.reservationForm.valid) {
      this.reservationService.updateReservation(this.data.id, this.reservationForm.value).subscribe({
        next: (response) => {
          console.log('Reservation updated successfully', response);
          // this.dialog.closeAll();
          this.openSnackBar();
            setTimeout(() => {
              window.location.reload();
            }, 1200);
          
        },
        error: (error: Error) => {
          this.openErrorDialog(error.message);
        }
      });
    }
  }

 

  openSnackBar() {
    this._snackBar.open('Reservation was edited sucessfuly', 'Close', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  cancel(){
    this.dialog.closeAll();
  }


  
  openErrorDialog(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage }
    });
  }
  



}
