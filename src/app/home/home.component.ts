import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  username: string | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      if (loggedIn) {
        this.username = this.authService.getUsername();
      } else {
        this.username = undefined;
      }
    });
  }

}