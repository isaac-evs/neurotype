import { Routes } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { SelectPlanComponent } from "./components/select-plan/select-plan.component";
import { AuthGuard } from "./guards/auth.guard";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ChatComponent } from "./components/chat/chat.component";

export const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "select-plan", component: SelectPlanComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: "chat", component: ChatComponent, canActivate: [AuthGuard] },
];
