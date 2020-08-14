import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IReview } from '../../shared/review.model';
import { ProductDetailService } from '../product-detail.service';

@Component({
	selector: 'app-product-detail-review',
	templateUrl: './product-detail-review.component.html',
	styleUrls: ['./product-detail-review.component.css'],
})
export class ReviewComponent implements OnInit {
	constructor(private productDetailService: ProductDetailService) {}
	@Input() reviews: IReview[];
	rate: number;
	rateOnFive: number;
	filteredReviews: IReview[];
	reviewForm: FormGroup = new FormGroup({
		course: new FormControl(''),
		rate: new FormControl(''),
		reviewContent: new FormControl('', Validators.required),
	});
	enableReview: boolean = false;
	ngOnInit(): void {
		this.filteredReviews = this.reviews;
		if (localStorage.getItem('token')) {
			this.enableReview = true;
		}
	}
	reviewTime(IOStime: string): any {
		const diff: number = new Date().getTime() - new Date(IOStime).getTime();
		return new Date(diff).getMonth() > 1
			? { type: 'months', value: new Date(diff).getMonth() }
			: { type: 'days', value: new Date(diff).getDate() };
	}
	onRate(event) {
		const x = event.pageX;
		this.rate = Math.ceil(((x - 336) * 100) / 73);
		this.rateOnFive = (Math.ceil(((x - 336) * 100) / 73) * 5) / 100;
	}
	onReview() {
		this.reviewForm.controls.rate.setValue(
			this.rateOnFive ? this.rateOnFive : 0
		);
		this.reviewForm.controls.course.setValue(this.reviews[0]['course']);
		this.productDetailService
			.review(this.reviewForm.value)
			.subscribe((res) => {
				this.reviews = res.data;
				this.reviewForm.controls.reviewContent.setValue('');
				this.rate = 0;
			});
	}
	filterReviews(searchtTerm) {
		this.reviews = this.filteredReviews.filter(
			(item) =>
				item.content.toLowerCase().indexOf(searchtTerm.toLowerCase()) >
				-1
		);
	}
}
