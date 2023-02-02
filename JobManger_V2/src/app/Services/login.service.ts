import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private UserapiUrl = environment.userLoginUrl;

  constructor(private http: HttpClient) {}

  user(userName: string | null = null): Observable<User> {
    return this.http
      .get(this.UserapiUrl, { params: { userName: userName ? userName : '' } })
      .pipe(
        map((resp) => {
          return new User().deserialize(resp);
        })
      );
  }
}
