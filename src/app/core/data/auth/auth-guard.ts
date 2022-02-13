import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // determine if it's allowed
        const allowed = this.authService.isLoggedIn();
        if (!allowed)
            this.router.navigate(['ext'])

        console.log('Is authorized: ', allowed);
        return allowed;
    }

}