import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GlobalVariables } from '../../global/global.variable';
import { AuthService } from 'src/app/dashboard/shared/auth.services';

@Injectable({
	providedIn: 'root',
})
export class UserDetailService {
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
}
