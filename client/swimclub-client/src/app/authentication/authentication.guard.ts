import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (await this.authService.isAuthenticated())
            return true;

        this.router.navigate(['/login']);
        return false;
    }
}