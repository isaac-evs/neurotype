import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-login",
  templateUrl: "./login.component.html",
  imports: [],
})
export class LoginComponent {
  form = {
    email: "",
    password: "",
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.authService.login(this.form).subscribe((response) => {
      localStorage.setItem("access_token", response.access_token);
      this.router.navigate(["/dashboard"]);
    });
  }
}
