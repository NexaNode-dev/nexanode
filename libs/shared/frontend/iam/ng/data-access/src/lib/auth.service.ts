import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ILogin,
  IPermission,
  IRegister,
  IUser,
} from '@nexanode/domain-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  register(register: IRegister) {
    return this.http.post<IUser>('/api/auth/register', register);
  }

  login(login: ILogin) {
    return this.http.post<{ user: IUser; permissions: IPermission[] }>(
      '/api/auth/login',
      login,
    );
  }

  activate(id: string, token: string) {
    return this.http.patch<boolean>(`/api/auth/activate/${id}`, token);
  }

  forgotPassword(credential: string) {
    return this.http.post<boolean>('/api/auth/forgot', credential);
  }

  resetPassword(token: string, password: string) {
    return this.http.patch<boolean>('/api/auth/reset', { token, password });
  }
}
