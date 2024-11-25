import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  location : string = '';

  constructor(private sidebarService: SidebarService, private router:Router){}

  ngOnInit(): void {
    this.sidebarService.actualLocation$.subscribe({next:(response)=>{
      this.location = response;
    }})
  }

  goToDashboard(){
    this.sidebarService.setActualLocation('main')
    this.router.navigateByUrl('/dashboard')

  }

  goToCalendar(){
    this.sidebarService.setActualLocation('calendar')
    this.router.navigateByUrl('/dashboard/calendar')
  }

  goToWork(){
    this.sidebarService.setActualLocation('work')
    this.router.navigateByUrl('/dashboard/work')
  }

}
