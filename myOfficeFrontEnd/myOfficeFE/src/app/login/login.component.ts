import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {
  loginForm!: FormGroup;
  

  constructor(private formBuilder: FormBuilder , private router : Router,
    private authService :AuthService ,  public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    
  }

  // onSubmit(): void {
  //   if(this.loginForm.valid){
  //     const{email , password} = this.loginForm.value;
  //     this.authService.login(email , password).subscribe(
  //       response => {
  //         console.log('login successful :' , response);
  //         this.authService.saveUserToocalStorage(response);
  //         this.router.navigate(['/reserve']); 
  //       },
  //       error => {         
  //         console.error('Login failed:', error);
    
  //       }
  //     )
  //   }
  // }

    onSubmit(): void {
    if(this.loginForm.valid){
      const{email , password} = this.loginForm.value;
      this.authService.login(email , password).subscribe({
        next: (response) => {
          console.log('login successful :' , response);
          this.authService.saveUserToocalStorage(response);
          this.router.navigate(['/reserve']); 
        },
        error: (error : Error) => {         
          console.error('Login failed:', error);
          this.openErrorDialog(error.message);
        }
    });
    }
  }


  openErrorDialog(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage }
    });
  }
  

  
}
