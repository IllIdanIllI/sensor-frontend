import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(environment.CURRENT_USER)));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    getToken() {
        return this.currentUserSubject.value["token"];
    }

    getRole() {
        return this.currentUserSubject.value["role"];
    }

    login(login: string, password: string) {
        return this.http.post<any>(`${environment.HOST_URL}/sign-in`, { login: login, password })
            .pipe(map((object => {
                let user: User = new User()
                user.token = object.token;
                user.role = object.role;
                localStorage.setItem(environment.CURRENT_USER, JSON.stringify(object))
                this.currentUserSubject.next(object)
                return user;
            })))
    }

    logout() {
        localStorage.removeItem(environment.CURRENT_USER);
        this.currentUserSubject.next(null);
    }
}