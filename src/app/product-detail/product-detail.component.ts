import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductDetailService } from './product-detail.service';
import { IProduct } from '../shared/products.model';
import { IReview } from '../shared/review.model';
import { GlobalVariables } from '../global/global.variable';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: [
		'./product-detail.component.css',
		'./product-detail-breadcrumb.component.css',
		'./product-detail-objectives.component.css',
	],
})
export class ProductDetailComponent implements OnInit {
	constructor(
		private productDetailService: ProductDetailService,
		private route: ActivatedRoute
	) {}
	product: IProduct;
	reviews: IReview[];
	studentBuy: IProduct[];
	ngOnInit(): void {
		this.route.params.subscribe(async (routerParams) => {
			await this.fetchData(routerParams.courseId);
			window.scroll(0, 0);
		});
	}
	fetchProductDetail(productId): Promise<any> {
		return this.productDetailService
			.getProductDetail(productId)
			.toPromise();
	}
	fetchStudentBuy(categoryId): Promise<any> {
		console.log(categoryId);
		return this.productDetailService.getstudentBuy(categoryId).toPromise();
	}
	async fetchData(productId) {
		const resProductDetail = await this.fetchProductDetail(productId);
		this.product = resProductDetail.data[0];
		this.reviews = resProductDetail.reviews;
		this.product.image = GlobalVariables.staticImage + this.product.image;
		this.product.author.image =
			GlobalVariables.staticImage + this.product.author.image;
		const resStudentBuy = await this.fetchStudentBuy(
			this.product.category.parents_category._id
		);
		this.studentBuy = resStudentBuy.data;
		this.studentBuy.forEach((element) => {
			element.image = GlobalVariables.staticImage + element.image;
		});
	}
}
