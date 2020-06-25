import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor() {}

	isAuthenticated(): boolean {
		if (this.getToken()) {
			return true;
		}
		return false;
	}

	getToken(): any {
		return localStorage.getItem('token');
	}
}
