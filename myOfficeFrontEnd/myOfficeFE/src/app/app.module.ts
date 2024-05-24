import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmplyeeViewComponent } from './emplyee-view/emplyee-view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { BottomMenuComponent } from './emplyee-view/bottom-menu/bottom-menu.component';
import { MatListModule } from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogReservationComponent } from './dialogs/dialog-reservation/dialog-reservation.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { DialogEditReservationComponent } from './dialogs/dialog-edit-reservation/dialog-edit-reservation.component';
import { DialogDeletionComponent } from './dialogs/dialog-deletion/dialog-deletion.component';
import { DialogEditYourProfileComponent } from './dialogs/dialog-edit-your-profile/dialog-edit-your-profile.component';
import { DataFormatPipe } from './pipes/DataFormat/data-format.pipe';
import { WeekendDisablePipe } from './pipes/Weekends/weekend-disable.pipe';
import { ReservationComponent } from './emplyee-view/reservation-table/reservation/reservation.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ReservationViewComponent } from './emplyee-view/reservation-view/reservation-view.component';
import { ChunkPipe } from './pipes/chunk/chunk.pipe';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog/error-dialog.component';










@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomepageComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    EmplyeeViewComponent,
    BottomMenuComponent,
    DialogReservationComponent,

    
    DialogEditReservationComponent,
    DialogDeletionComponent,
    DialogEditYourProfileComponent,
    DataFormatPipe,
    WeekendDisablePipe,
    ReservationComponent,
    ReservationViewComponent,
    ChunkPipe,
    ErrorDialogComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule ,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSidenavModule,
    MatStepperModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatBottomSheetModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    HttpClientModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule
    ,MatTableModule,
    FormsModule,
    MatSnackBarModule,
    MatDividerModule,
    MatIconModule
    

    
  
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogComponent]
})
export class AppModule { }
