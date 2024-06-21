import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQueryParams, IUser } from '@nexanode/domain-interfaces';
import { convertToHttpParams } from '@nexanode/frontend-http-params-util';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = '/api/users';

  constructor(private readonly http: HttpClient) {}

  getUsers(query?: IQueryParams<IUser>) {
    const queryParams = convertToHttpParams(query || {});
    return this.http.get<IUser[]>(`${this.apiUrl}`, { params: queryParams });
  }

  getUser(id: string) {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Partial<IUser>) {
    return this.http.post<IUser>(`${this.apiUrl}`, user);
  }

  updateUser(id: string, user: Partial<IUser>) {
    return this.http.put<IUser>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}
