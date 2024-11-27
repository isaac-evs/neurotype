import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  standalone: true,
  selector: "app-register",
  templateUrl: "./register.component.html",
  imports: [],
})
export class RegisterComponent {
  form = {
    email: "",
    password: "",
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.form).subscribe((response) => {
      // Handle successful registration
    });
  }
}
