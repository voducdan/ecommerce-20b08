import { Injectable } from '@angular/core';

import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GlobalVariables } from '../global/global.variable';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-type': 'application/json',
	}),
	params: {},
};

@Injectable({
	providedIn: 'root',
})
export class SearchCourseService {
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
		return of(error.error);
	}

	private extractData(res: Response) {
		const body = res;
		return body || {};
	}

	searchCourse(filter): Observable<any> {
		return this.http
			.post(
				GlobalVariables.apiURL + '/search/courses',
				filter,
				httpOptions
			)
			.pipe(map(this.extractData), catchError(this.handleError));
	}

	getCoursesByName(name): Observable<any> {
		return this.http
			.get(GlobalVariables.apiURL + '/search?s=' + name, httpOptions)
			.pipe(map(this.extractData), catchError(this.handleError));
	}
}
