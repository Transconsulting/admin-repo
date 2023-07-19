import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "app";

  isLoggedIn = false;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
    // iconSet singleton
  }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
    if (this.tokenStorageService.getRole() === "ADMIN") {
        this.router.navigate(["/dashboard/dashboard1"]);
      } else {
      }
    } else {
      this.router.navigate(["/authentication/login"]);
    }
  }
  // logout(): void {
  //   this.tokenStorageService.signOut();
  //   window.location.reload();
  // }
}
