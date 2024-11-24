import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Notes } from '../../types/notes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  notes: Notes | null = null;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.userInfo$.subscribe({
      next: (notes:Notes | null)=>{
        this.notes = notes;
      }, 
      error: (err) => {
        console.error('Error al obtener el usuario desde el observable', err);
      }
    })

    this.userService.getUserData(); 
      
  } //para mostrar la infromacion del usuario hay que modificar el html con notes etc etc
}
