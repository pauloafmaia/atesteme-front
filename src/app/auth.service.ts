import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private username: string | undefined;

  constructor(private router: Router, private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>('http://localhost:8080/users/login', { username, password })
      .pipe(
        map(response => {
          if (response) {
            this.loggedIn$.next(true);
            this.username = username;
            this.router.navigate(['/home']);
            return true;
          } else {
            this.loggedIn$.next(false);
            return false;
          }
        }),
        catchError(error => {
          console.error('Erro ao tentar fazer login:', error);
          this.loggedIn$.next(false);
          return of(false);
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  getUsername(): string | undefined {
    return this.username;
  }

  logout(): void {
    this.loggedIn$.next(false);
    this.username = undefined;
    this.router.navigate(['/']);
  }
}
