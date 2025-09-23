// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:44385/api/Auth'; 

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/login`,
      { userName: username, password }
    ).pipe(tap(res => localStorage.setItem('jwt', res.token)),
  );
  }
  
  register(username: string, password: string){
    return this.http.post<{token : string}>(
      `${this.apiUrl}/register`,
      { userName: username, password}
    ).pipe(tap(res => localStorage.setItem('jwt', res.token)))
  }


  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('jwt');
    }
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
