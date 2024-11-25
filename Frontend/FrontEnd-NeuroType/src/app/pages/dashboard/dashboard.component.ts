import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Notes } from '../../types/notes';
import { SidebarComponent } from '../../components/layout/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent,RouterOutlet],
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
      
  } 
}
