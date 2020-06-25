import { Injectable } from '@angular/core';
import {
	CanActivate,
	Router,
	RouterStateSnapshot,
	ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthService } from './auth.services';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	/**
	 *  Protects the routes to reach with authentication
	 */
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		if (this.authService.isAuthenticated()) {
			return true;
		} else {
			this.router.navigate(['user/login'], {
				queryParams: { redirectURL: state.url },
			});
			return false;
		}
	}
}
