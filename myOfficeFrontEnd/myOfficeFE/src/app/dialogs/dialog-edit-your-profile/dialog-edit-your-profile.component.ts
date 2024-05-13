import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateEmployeeReq } from 'src/app/model/CreateEmployeeReq';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dialog-edit-your-profile',
  templateUrl: './dialog-edit-your-profile.component.html',
  styleUrls: ['./dialog-edit-your-profile.component.scss']
})
export class DialogEditYourProfileComponent implements OnInit {
  
  editprofileForm! : FormGroup
  editUser! : CreateEmployeeReq;
  currentUser : any;
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private userService : UserService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router : Router
  ){}


  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserFromLocalStorage();
    this.id = this.currentUser.id;
    this.initForm();
    this.fillForm();
  }

  initForm(){
    this.editprofileForm = this.formBuilder.group({
    email : [''],
    firstName : [''],
    lastName : [''],
    password : ['']
    });
  }



  fillForm(){
    this.authService.findUserById(this.id).subscribe((editUser : CreateEmployeeReq) =>{
    this.editUser = editUser
    console.log(editUser)
    this.editprofileForm.patchValue(this.editUser)

  });
  }


  onSubmit(){
    if(this.editprofileForm.valid){
      const updatedUser : CreateEmployeeReq = this.editprofileForm.value;
      this.userService.updateUser( this.id ,updatedUser).subscribe();
      this.router.navigate(['./reserve'])
      this.dialog.closeAll();
      this.openSnackBar()
    }
    
  }

  openSnackBar() {
    this._snackBar.open('Profile edited successfully', 'Close', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
