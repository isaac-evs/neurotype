import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { RegisterService } from '../../services/register.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../../types/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  form: FormGroup;

  constructor(formBuilder : FormBuilder, private registerService:RegisterService){
    this.form = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
    },{validators: this.passwordMatch.bind(this)});
  }

  ngOnInit(): void {
    this.registerService.userRegistered$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(isRegistered => {
      if (isRegistered) {
        console.log('usuario registrado con éxito');
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  passwordMatch(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmControl = formGroup.get('confirm');
  
    if (!passwordControl || !confirmControl) {
      return null;
    }
  
    if (passwordControl.value !== confirmControl.value) {
      confirmControl.setErrors({ passwordMatch: true });
    } else {
      confirmControl.setErrors(null);
    }
  
    return null;
  }

  signUp() {
    if (this.form.valid) {
      const user: User = {
        name: this.form.get('name')?.value,
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      };
      this.registerService.register(user)
    } else {
      console.log('Formulario no válido');
    }
  }

}
