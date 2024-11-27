import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  standalone: true,
  selector: "app-select-plan",
  templateUrl: "./select-plan.component.html",
  imports: [],
})
export class SelectPlanComponent {
  selectedPlan = "";

  constructor(private authService: AuthService) {}

  onSelectPlan(plan: string) {
    this.selectedPlan = plan;
    this.authService.selectPlan(plan).subscribe((response) => {
      // Handle plan selection
    });
  }
}
