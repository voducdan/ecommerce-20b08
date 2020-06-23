import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { GlobalVariables } from '../../global/global.variable';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-type': 'application/json' }),
	params: {},
};

@Injectable({
	providedIn: 'root',
})
export class RevenueService {
	constructor(private http: HttpClient) {}

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

	getRevenue(): Observable<any> {
		return this.http
			.get(GlobalVariables.apiURL + '/revenue/date', httpOptions)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
}
