import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RegisterService } from "../../services/register.service";
import { takeUntil, Subject } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group(
      {
        name: ["", [Validators.required, Validators.minLength(2)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirm: ["", [Validators.required, Validators.minLength(8)]],
      },
      { validators: this.passwordMatch.bind(this) },
    );
  }

  ngOnInit(): void {
    this.registerService.userRegistered$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isRegistered: boolean) => {
        if (isRegistered) {
          console.log("Usuario registrado con éxito");
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  passwordMatch(formGroup: FormGroup): null {
    const passwordControl = formGroup.get("password");
    const confirmControl = formGroup.get("confirm");

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

  signUp(): void {
    if (this.form.valid) {
      const user = {
        email: this.form.get("email")?.value,
        password: this.form.get("password")?.value,
      };
      this.registerService.register(user).subscribe({
        next: () => {
          this.registerService.setUserRegistered(true);
          this.router.navigateByUrl('/dashboard')
        },
        error: (err) => {
          console.error("Algo salió mal en la petición al servidor", err);
        },
      });
    } else {
      console.log("Formulario no válido");
    }
  }
}
