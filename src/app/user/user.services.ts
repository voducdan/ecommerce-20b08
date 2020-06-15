import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { GlobalVariables } from '../global/index';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-type': 'application/json' }),
	params: {},
};

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient) {}

	private extractData(res: Response) {
		const body = res;
		return body || {};
	}

	private setToken(body) {
		if (body.success) {
			localStorage.setItem('token', body.token);
		}
	}

	register(userData): Observable<any> {
		httpOptions.params = userData;
		return this.http
			.post(GlobalVariables.apiURL + '/user', httpOptions)
			.pipe(
				map(this.extractData),
				tap(this.setToken),
				catchError((err) => {
					return of(err);
				})
			);
	}

	login(account): Observable<any> {
		httpOptions.params = account;
		return this.http
			.post(GlobalVariables.apiURL + '/user/auth', httpOptions)
			.pipe(
				map(this.extractData),
				tap(this.setToken),
				catchError((err) => {
					return of(err);
				})
			);
	}
}
