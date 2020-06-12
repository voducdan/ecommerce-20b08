import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductDetailService } from './product-detail.service';
import { IProduct } from '../shared/products.model';
import { IReview } from '../shared/review.model';
import { GlobalVariables } from '../global/global.variable';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
	constructor(
		private productDetailService: ProductDetailService,
		private route: ActivatedRoute
	) {}
	product: IProduct;
	reviews: IReview[];
	isExpand = false;
	ngOnInit(): void {
		const productId = this.route.snapshot.paramMap.get('courseId');
		this.productDetailService
			.getProductDetail(productId)
			.subscribe((res) => {
				this.product = res.data[0];
				this.reviews = res.reviews;
				this.product.image =
					GlobalVariables.staticImage + this.product.image;
				this.product.author.image =
					GlobalVariables.staticImage + this.product.author.image;
			});
	}
	expandAll() {
		this.isExpand = !this.isExpand;
	}

	reviewTime(IOStime: string): any {
		const diff: number = new Date().getTime() - new Date(IOStime).getTime();
		return new Date(diff).getMonth() > 1
			? { type: 'months', value: new Date(diff).getMonth() }
			: { type: 'days', value: new Date(diff).getDate() };
	}
}
