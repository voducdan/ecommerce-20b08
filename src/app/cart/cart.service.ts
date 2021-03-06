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

@Injectable({
	providedIn: 'root',
})
export class CartService {
	constructor(private http: HttpClient, private authService: AuthService) {}

	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.log('An error occurred:', error.error.message);
		} else {
		}
		return of(error.error);
	}

	private extractData(res: Response) {
		const body = res;
		return body || {};
	}

	getCart(cart): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-type': 'application/json',
			}),
		};
		return this.http
			.post(
				GlobalVariables.apiURL + '/courses/cart',
				{ cart },
				httpOptions
			)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
	removeCartItem(item): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-type': 'application/json',
				authorization: `Bearer ${this.authService.getToken()}`,
			}),
		};
		return this.http.put(
			GlobalVariables.apiURL + '/user/cart',
			{ courseId: item },
			httpOptions
		);
	}
	checkout(): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-type': 'application/json',
				authorization: `Bearer ${this.authService.getToken()}`,
			}),
		};
		return this.http.get(
			GlobalVariables.apiURL + '/payment/pay',
			httpOptions
		);
	}
}
