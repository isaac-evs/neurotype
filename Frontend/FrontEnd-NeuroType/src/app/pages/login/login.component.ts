import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.loginService.userLogged$.subscribe((isLogged: boolean) => {
      if (isLogged) {
        console.log("User logged in");
      }
    });
  }

  login(): void {
    if (this.form.valid) {
      this.loginService.login(this.form.getRawValue()).subscribe({
        next: (response) => {
          this.loginService.setUserLogged(true);
          this.router.navigateByUrl("/dashboard");
        },
        error: (err) => {
          console.error("Login error:", err);
          this.errorMessage = "Invalid credentials or server issue.";
        },
      });
    }
  }
}
