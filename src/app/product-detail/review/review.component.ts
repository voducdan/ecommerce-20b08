import { Component, OnInit, Input } from '@angular/core';

import { IReview } from '../../shared/review.model';

@Component({
	selector: 'app-product-detail-review',
	templateUrl: './product-detail-review.component.html',
	styleUrls: ['./product-detail-review.component.css'],
})
export class ReviewComponent implements OnInit {
	constructor() {}
	@Input() reviews: IReview[];
	ngOnInit(): void {}

	reviewTime(IOStime: string): any {
		const diff: number = new Date().getTime() - new Date(IOStime).getTime();
		return new Date(diff).getMonth() > 1
			? { type: 'months', value: new Date(diff).getMonth() }
			: { type: 'days', value: new Date(diff).getDate() };
	}
}
