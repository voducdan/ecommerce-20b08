import { Component, OnInit, Input } from '@angular/core';

import { IProduct } from '../../shared/products.model';
import { ProductService } from '../../products/products.service';
import { EventService } from '../../event-service';

@Component({
	selector: 'app-product-detail-banner',
	templateUrl: './product-detail-banner.component.html',
	styleUrls: [
		'./product-detail-banner.component.css',
		'./product-detail-previewbox.component.css',
	],
})
export class BannerComponent implements OnInit {
	constructor(
		private productService: ProductService,
		private eventService: EventService
	) {}
	@Input() product: IProduct;
	cart: string[] = [];
	cartItem: number = 0;
	ngOnInit(): void {
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
	}
	addToCart() {
		this.cart.push(this.product._id);
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
