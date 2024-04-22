import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl: string = 'http://localhost:8085';

  constructor(private http: HttpClient) {}

  users$ = (
    name: string = '',
    page: number = 0,
    size: number = 10
  ): Observable<any> =>
    this.http.get<any>(
      `${this.apiUrl}/users?name=${name}&page=${page}&size=${size}`
    );

  /*  getUsers(name: string = '', page: number = 0, size: number = 10): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/users?name=${name}&page=${page}&size=${size}`)
  } */
}
