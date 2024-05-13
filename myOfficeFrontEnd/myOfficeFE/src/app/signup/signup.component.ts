import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent 
  implements OnInit {
    signupForm!: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private userService : UserService,
      private router: Router
    ) { }
  
    ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
        firstName: ['',  [ Validators.required , Validators.minLength(5)]],
        lastName: ['',  [ Validators.required , Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [ Validators.required , Validators.minLength(5)]],
        
       
      });
    }
  
    onSubmit(): void {
      if (this.signupForm.valid) {
        console.log("success")
      this.userService.createUser(this.signupForm.value).subscribe();
    }
  }
}
