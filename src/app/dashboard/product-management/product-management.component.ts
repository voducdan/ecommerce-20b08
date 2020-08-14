import { Component } from '@angular/core';

import { ProductManagementService } from './product-management.service';
import { IProduct } from '../../shared/products.model';
import { GlobalVariables } from 'src/app/global/global.variable';
@Component({
	templateUrl: './product-management.html',
	styleUrls: ['./product-management.css'],
})
export class ProductManagementComponent {
	constructor(private productService: ProductManagementService) {}

	products: IProduct[];
	filteredCourses: IProduct[];
	totalCourses: number;
	totalMoney: number;
	selledCourses: number;
	ngOnInit() {
		this.productService.getProducts().subscribe((res) => {
			this.products = res.data;
			this.filteredCourses = res.data;
			this.products.map((product) => {
				product.image = GlobalVariables.staticImage + product.image;
			});
		});
		this.productService.getProductsInfo().subscribe((res) => {
			this.totalCourses = res.data.totalCourse;
			this.totalMoney = res.data.totalMoney;
			this.selledCourses = res.data.selledCourses;
		});
	}
	deleteCourse(courseId) {
		this.productService.deleteProduct(courseId).subscribe((res) => {
			this.products = this.products.filter(
				(item) => item._id !== courseId
			);
		});
	}

	editCourse(courseId) {}

	filterCourse(searchtTerm) {
		this.products = this.filteredCourses.filter(
			(item) =>
				item.name.toLowerCase().indexOf(searchtTerm.toLowerCase()) > -1
		);
	}
}
