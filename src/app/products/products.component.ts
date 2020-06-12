import { Component } from '@angular/core';

import { ProductService } from './products.service';
import { IProduct } from '../shared/products.model';
import { GlobalVariables } from '../global/global.variable';

@Component({
	selector: 'app-products-list',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css'],
})
export class ProductComponent {
	constructor(private productService: ProductService) {}

	products: IProduct[];
	ngOnInit() {
		this.productService.getProducts().subscribe((res) => {
			this.products = res.data;
			this.products.map((product) => {
				product.image = GlobalVariables.staticImage + product.image;
			});
		});
	}
}
