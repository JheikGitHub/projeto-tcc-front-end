import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const URL_API = 'http://localhost:51990';

const USER = 'user';

const userToken: string = 'userToken';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }

    authenticate(user: UserAuthenticateDTO) {
        var body = "grant_type=password&username=" + user.username + "&password=" + user.password;
        var header = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded' })
        return this.http.post(URL_API + "/api/token", body, { headers: header });

    }

    setUser(username: string, perfil: string) {
        var user: object = { username: username, perfil: perfil };
        window.localStorage.setItem(USER, JSON.stringify(user));
    }

    getPerfil() {
        return window.localStorage.getItem(USER);
    }

    getUser() {
        return this.http.get(URL_API + "/api/usuario/acess-user", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.getToken()
            })
        });
    }

    removeUser() {
        window.localStorage.removeItem(USER);
    }

    hasToken(): boolean {
        return !!this.getToken();
    }

    setToken(tokem: string) {
        window.localStorage.setItem(userToken, tokem)
    }


    getToken() {
        return window.localStorage.getItem(userToken);
    }

    removeToken() {
        window.localStorage.removeItem(userToken);
    }
}

export class UserAuthenticateDTO {
    username: string;
    password: string;
}

