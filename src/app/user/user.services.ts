import { Injectable } from '@angular/core';

import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { GlobalVariables } from '../global/index';
import { AuthService } from '../dashboard/shared/auth.services';
const httpOptions = {
	headers: new HttpHeaders({ 'Content-type': 'application/json' }),
	params: {},
};

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient, private authService: AuthService) {}

	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.error('An error occurred:', error.error.message);
		} else {
			console.error(
				`Backend returned code ${error.status}, ` +
					`body was: ${error.error}`
			);
		}
		return of(error);
	}
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
	getUser(): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-type': 'application/json',
				authorization: `Bearer ${this.authService.getToken()}`,
			}),
		};
		return this.http
			.get(`${GlobalVariables.apiURL}/user`, httpOptions)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
	updateProfile(userProfile: any): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-type': 'application/json',
				authorization: `Bearer ${this.authService.getToken()}`,
			}),
		};
		return this.http
			.put(`${GlobalVariables.apiURL}/user`, userProfile, httpOptions)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
	updateAvt(avt: File): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				authorization: `Bearer ${this.authService.getToken()}`,
			}),
		};

		const formData: FormData = new FormData();
		formData.append('avt', avt, avt.name);
		return this.http
			.post(
				`${GlobalVariables.apiURL}/user/upload/avt`,
				formData,
				httpOptions
			)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
	changePass(pwd): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-type': 'application/json',
				authorization: `Bearer ${this.authService.getToken()}`,
			}),
		};
		return this.http
			.put(`${GlobalVariables.apiURL}/user/password`, pwd, httpOptions)
			.pipe(
				tap(this.setToken),
				map(this.extractData),
				catchError(this.handleError)
			);
	}
	getUserPayment(): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-type': 'application/json',
				authorization: `Bearer ${this.authService.getToken()}`,
			}),
		};
		return this.http
			.get(`${GlobalVariables.apiURL}/user/payment`, httpOptions)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
	updateUserPayment(payment): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-type': 'application/json',
				authorization: `Bearer ${this.authService.getToken()}`,
			}),
		};
		return this.http
			.post(
				`${GlobalVariables.apiURL}/user/payment`,
				payment,
				httpOptions
			)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
	getUserCourses(): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-type': 'application/json',
				authorization: `Bearer ${this.authService.getToken()}`,
			}),
		};
		return this.http
			.get(`${GlobalVariables.apiURL}/user/courses`, httpOptions)
			.pipe(map(this.extractData), catchError(this.handleError));
	}

	forgotPass(email): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-type': 'application/json',
			}),
		};
		return this.http
			.post(
				`${GlobalVariables.apiURL}/user/forgotpassword`,
				email,
				httpOptions
			)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
	resetPass(data): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-type': 'application/json',
			}),
		};
		return this.http
			.post(
				`${GlobalVariables.apiURL}/user/resetpassword`,
				data,
				httpOptions
			)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
}
