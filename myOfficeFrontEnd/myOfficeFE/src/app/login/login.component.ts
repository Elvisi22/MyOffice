import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {
  loginForm!: FormGroup;
  

  constructor(private formBuilder: FormBuilder , private router : Router,
    private authService :AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    
  }

  onSubmit(): void {
    if(this.loginForm.valid){
      const{email , password} = this.loginForm.value;
      this.authService.login(email , password).subscribe(
        response => {
          console.log('login successful :' , response);
          this.authService.saveUserToocalStorage(response);
          this.router.navigate(['/reserve']); 
        },
        error => {         
          console.error('Login failed:', error);
    
        }
      )
    }
  }



  

  
}
