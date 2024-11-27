import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { TokenInterceptor } from "./app/interceptors/token.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
});
