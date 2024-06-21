import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  navigate() {
    this.router.navigate(['/register']);
  }

  onSubmit(): void {
    this.loginError = false;
    this.authService.login(this.username, this.password).subscribe(
      isLoggedIn => {
        if (!isLoggedIn) {
          this.loginError = true;
        } else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.error('Erro no login:', error);
        this.loginError = true;
      }
    );
  }
}