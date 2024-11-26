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
import { AuthService } from "../../services/auth.service";

import { UserLogin } from "../../types/user";

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
    private authService: AuthService,
    private router: Router
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
      const user: UserLogin = {
        username: this.form.get("email")?.value,
        password: this.form.get("password")?.value,
      };
      this.loginService.login(user).subscribe({
        next: (response) => {
          const token = response.access_token;
          this.authService.setToken(token);
          this.loginService.setUserLogged(true);
          this.router.navigateByUrl('dashboard')
        },
        error: (err) => {
          console.log(user)
          console.error("Login error:", err);
          this.errorMessage = "Invalid credentials or server issue.";
        },
      });
    }
  }
}
