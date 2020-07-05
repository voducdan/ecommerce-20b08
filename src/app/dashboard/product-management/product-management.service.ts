import { Injectable } from '@angular/core';

import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GlobalVariables } from '../../global/global.variable';
import { AuthService } from '../shared/auth.services';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-type': 'application/json' }),
	params: {},
};

@Injectable({
	providedIn: 'root',
})
export class ProductManagementService {
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

	getProducts(): Observable<any> {
		return this.http
			.get(GlobalVariables.apiURL + '/courses', httpOptions)
			.pipe(map(this.extractData), catchError(this.handleError));
	}

	deleteProduct(productId): Observable<any> {
		if (!httpOptions.headers.get('authorization')) {
			httpOptions.headers = httpOptions.headers.append(
				'authorization',
				`Bearer ${this.authService.getToken()}`
			);
		}
		return this.http
			.delete(
				GlobalVariables.apiURL + '/courses/' + productId,
				httpOptions
			)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
}
