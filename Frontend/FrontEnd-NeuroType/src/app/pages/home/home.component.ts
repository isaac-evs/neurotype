import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  theme: boolean = false;


  handleTheme():void{
    this.theme = !this.theme;
    if (this.theme) {
      console.log('Modo oscuro activado');
      document.documentElement.style.setProperty('--primary-color', 'black');
      document.documentElement.style.setProperty('--secondary-color', 'white');
      document.documentElement.style.setProperty('--third-color', '#6d6d6d');
    } else {
      console.log('Modo claro activado');
      document.documentElement.style.setProperty('--primary-color', 'white');
      document.documentElement.style.setProperty('--secondary-color', 'black');
      document.documentElement.style.setProperty('--third-color', '#6d6d6d');
    }
  }
}
