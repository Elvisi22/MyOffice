import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmplyeeViewComponent } from './emplyee-view/emplyee-view.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { ReservationComponent } from './emplyee-view/reservation-table/reservation/reservation.component';
import { DialogEditYourProfileComponent } from './dialogs/dialog-edit-your-profile/dialog-edit-your-profile.component';
import { ReservationViewComponent } from './emplyee-view/reservation-view/reservation-view.component';

const routes: Routes = [
  {path: 'login', 
  component: LoginComponent},
  {path: 'signup', 
  component: SignupComponent},
  {path: 'reserve', 
  component: EmplyeeViewComponent  , canActivate:[AuthenticationGuard]
  },
  {path: 'reservation-list', 
  component: ReservationComponent  , canActivate:[AuthenticationGuard]
  },
  {path: 'edit-profile', 
  component: DialogEditYourProfileComponent},
  {path: 'reservation-view/:id' , component : ReservationViewComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
