import { Component } from '@angular/core';

import { ProductService } from './products.service';
import { IProduct } from '../shared/products.model';
import { GlobalVariables } from '../global/global.variable';
import { EventService } from '../event-service';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-products-list',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css'],
})
export class ProductComponent {
	constructor(
		private productService: ProductService,
		private eventService: EventService,
		private route: ActivatedRoute
	) {}

	products: IProduct[];
	next: number;
	prev: number;
	numPage: number[];
	currPage: number;
	addedToCart: IProduct = undefined;
	cart: string[] = [];
	cartItem: number = 0;
	ngOnInit() {
		this.productService.getCart().subscribe((res) => {
			if (res.success) {
				const localCart = JSON.parse(localStorage.getItem('cart'));
				this.cart = res.data;
				if (localCart) {
					this.cart = [...new Set([...localCart, ...this.cart])];
				}
				this.productService.updateCart(this.cart).subscribe((res) => {
					if (res.success) {
						this.cartItem = this.cart.length;
						localStorage.removeItem('cart');
						this.eventService.changeMessage(this.cartItem);
					}
				});
			} else {
				this.cart = JSON.parse(localStorage.getItem('cart')) || [];
				this.eventService.changeMessage(this.cart.length);
			}
		});
		this.route.queryParams.subscribe((query) => {
			this.productService
				.getProducts({ page: query.page, category: query.category })
				.subscribe((res) => {
					this.next = res.next;
					this.prev = res.prev;
					this.numPage = Array(res.numPage)
						.fill(0)
						.map((x, i) => i + 1);
					this.currPage = res.page;
					this.products = res.data;
					this.products.map((product) => {
						product.image =
							GlobalVariables.staticImage + product.image;
					});
				});
		});
	}

	addToCart(product) {
		this.addedToCart = product;
		this.cart.push(product._id);
		this.cartItem++;
		if (localStorage.getItem('token')) {
			this.productService.updateCart(this.cart).subscribe((res) => {
				if (res.success) {
					this.eventService.changeMessage(res.data.length);
				}
			});
		} else {
			localStorage.setItem('cart', JSON.stringify(this.cart));
			this.eventService.changeMessage(
				JSON.parse(localStorage.getItem('cart')).length
			);
		}
	}
}
