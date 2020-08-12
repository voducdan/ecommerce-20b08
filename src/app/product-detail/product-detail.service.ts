import { Injectable } from '@angular/core';

import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GlobalVariables } from '../global/index';
import { AuthService } from '../dashboard/shared/auth.services';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-type': 'application/json' }),
	params: {},
};

@Injectable({
	providedIn: 'root',
})
export class ProductDetailService {
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

	getProductDetail(productId: String): Observable<any> {
		return this.http
			.get(GlobalVariables.apiURL + '/courses/' + productId, httpOptions)
			.pipe(map(this.extractData, catchError(this.handleError)));
	}
	getstudentBuy(categoryId: String): Observable<any> {
		return this.http
			.get(
				GlobalVariables.apiURL +
					'/courses/' +
					categoryId +
					'/suggestion',
				httpOptions
			)
			.pipe(map(this.extractData, catchError(this.handleError)));
	}

	review(review): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-type': 'application/json',
				authorization: `Bearer ${this.authService.getToken()}`,
			}),
		};
		return this.http
			.post(
				GlobalVariables.apiURL + '/courses/review',
				review,
				httpOptions
			)
			.pipe(map(this.extractData, catchError(this.handleError)));
	}
}
