import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorMessage: string = '';


  constructor(formBuilder : FormBuilder, private loginService:LoginService, private router:Router){
    this.form = formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[ Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
      this.loginService.userLoged$.subscribe((isLogged)=>{
        if(isLogged){
          console.log('usuario logeado')
        }
      })
  }

  login(){
    if(this.form.valid){
      console.log(this.form.getRawValue())
      this.loginService.login(this.form.getRawValue()).subscribe({
        next: (response) => {
          this.loginService.setUserLogged(true)
          this.router.navigateByUrl('/dashboard')
        },
        error: (err) =>{
          console.error('Error al iniciar sesión:', err);
          this.errorMessage = 'Credenciales incorrectas o hubo un problema con el servidor.';
          this.loginService.setUserLogged(false);

        }
      })
    }else{
      console.log('formulario no valido')
    }
  }

}
