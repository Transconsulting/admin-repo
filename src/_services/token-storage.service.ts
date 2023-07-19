import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";
const TOKEN_KEY = "auth-token-guine";
const USER_KEY = "auth-user";
const ROLE_KEY = "role";

@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    sessionStorage.clear();
  }

  public saveToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    let tok = sessionStorage.getItem(TOKEN_KEY);
    return sessionStorage.getItem(TOKEN_KEY);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public saveUser(user: any): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveRole(role: string) {
    sessionStorage.removeItem(ROLE_KEY);
    sessionStorage.setItem(ROLE_KEY, JSON.stringify(role));
  }

  public getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }

    return user;
  }

  public getRole(): any {
    const role = sessionStorage.getItem(ROLE_KEY);

    if (role) {
      return JSON.parse(role);
    }

    return role;
  }
}
