import { Injectable } from '@angular/core';

import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GlobalVariables } from '../global/global.variable';
import { AuthService } from '../dashboard/shared/auth.services';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-type': 'application/json' }),
	params: {},
};

@Injectable({
	providedIn: 'root',
})
export class ProductService {
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
		return throwError('Something bad happened; please try again later.');
	}

	private extractData(res: Response) {
		const body = res;
		return body || {};
	}

	getProducts(query): Observable<any> {
		let url = '';
		if (!query.page) {
			query.page = 1;
		}
		if (query.category) {
			url =
				GlobalVariables.apiURL +
				'/courses?page=' +
				query.page +
				'&category=' +
				query.category;
		} else {
			url = GlobalVariables.apiURL + '/courses?page=' + query.page;
		}
		console.log(url);
		return this.http
			.get(url, httpOptions)
			.pipe(map(this.extractData), catchError(this.handleError));
	}

	getCart(): Observable<any> {
		if (this.authService.getToken()) {
			const httpOptions = {
				headers: new HttpHeaders({
					'Content-type': 'application/json',
					authorization: `Bearer ${this.authService.getToken()}`,
				}),
			};
			return this.http
				.get(`${GlobalVariables.apiURL}/user/cart`, httpOptions)
				.pipe(map(this.extractData), catchError(this.handleError));
		}
		return new Observable((observer) => {
			observer.next({
				success: false,
			});
		});
	}

	updateCart(cart: string[]): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-type': 'application/json',
				authorization: `Bearer ${this.authService.getToken()}`,
			}),
		};
		return this.http
			.post(`${GlobalVariables.apiURL}/user/cart`, { cart }, httpOptions)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
}
