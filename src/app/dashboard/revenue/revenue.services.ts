import { Injectable } from '@angular/core';

import { AuthService } from '../shared/auth.services';

import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GlobalVariables } from '../../global/global.variable';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-type': 'application/json',
	}),
	params: {},
};

@Injectable({
	providedIn: 'root',
})
export class RevenueService {
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
		return of(error.error);
	}

	private extractData(res: Response) {
		const body = res;
		return body || {};
	}

	getRevenue(): Observable<any> {
		if (!httpOptions.headers.get('authorization')) {
			httpOptions.headers = httpOptions.headers.append(
				'authorization',
				`Bearer ${this.authService.getToken()}`
			);
		}
		return this.http
			.get(GlobalVariables.apiURL + '/revenue/date', httpOptions)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
	getInSingeMonthRevenue(month): Observable<any> {
		if (!httpOptions.headers.get('authorization')) {
			httpOptions.headers = httpOptions.headers.append(
				'authorization',
				`Bearer ${this.authService.getToken()}`
			);
		}
		return this.http
			.get(
				GlobalVariables.apiURL + '/revenue/date?month=' + month,
				httpOptions
			)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
	getRevenueByCategory(): Observable<any> {
		if (!httpOptions.headers.get('authorization')) {
			httpOptions.headers = httpOptions.headers.append(
				'authorization',
				`Bearer ${this.authService.getToken()}`
			);
		}
		return this.http
			.get(GlobalVariables.apiURL + '/revenue/category', httpOptions)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
}
