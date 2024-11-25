import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { debounceTime } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent implements OnInit{
  placeHolder:string = 'Today felt so refreshing! I woke up feeling light and started my day with a relaxing walk in the park. No worries on my mind, just pure calm. I soaked in the little joys—the sun shining, birds chirping, and the cozy warmth of my tea. It was such a beautifully simple day, and for once, I felt really good. '
  savedMessage: string ='';

  form : FormGroup;

  constructor(formBuilder: FormBuilder, private userService: UserService ){
    this.form = formBuilder.group({
      note: ['',[]]
    })
  }

  ngOnInit(): void {
      this.form.get('note')?.valueChanges.pipe(
        debounceTime(5000)
      ).subscribe(value =>{
        console.log(value)
        this.userService.postNote(value).subscribe({
          next: () =>{
            const today = new Date;
            this.savedMessage = 'Saved on ' + today.getTime;
          },
          error: (err)=>{
            const today = new Date;
            this.savedMessage = 'Failed to save note ' + today.toLocaleString();
          }
        })
      })
  }




}
