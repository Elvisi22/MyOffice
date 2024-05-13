import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { DialogEditYourProfileComponent } from '../dialogs/dialog-edit-your-profile/dialog-edit-your-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from '../services/reservation/reservation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
currentUser : any;
isMenuOpen: boolean = false;
reservCountNO! : number;
constructor(
  public authService : AuthService,
  private route : Router,
  public dialog: MatDialog,
  public reservationService : ReservationService
){}


ngOnInit(): void {
  this.getCurrentUser();
  this.getReservationCount();
}

getReservationCount(){
   this.reservationService.getReservationCount(this.currentUser.id).subscribe(response => {
    this.reservCountNO = response;
  }
)
}

getCurrentUser(){
  this.currentUser = this.authService.getCurrentUserFromLocalStorage();
}

isLoggedIn():boolean{
  return this.authService.isLoggedIn();
}

openProfile(){
  this.dialog.open(DialogEditYourProfileComponent, {
    width: '400px', 
    height: '460px',
    
  });
}

logout() : void{
  
    this.authService.logout();
    this.route.navigate(['./login'])
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}


