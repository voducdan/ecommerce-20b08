import { Component } from '@angular/core';
import { ProductService } from '../products/products.service';
import { AuthService } from '../dashboard/shared/auth.services';
import { CartService } from './cart.service';
import { GlobalVariables } from '../global';
import { EventService } from '../event-service';

@Component({
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css'],
})
export class CartComponent {
	constructor(
		private productService: ProductService,
		private authService: AuthService,
		private cartService: CartService,
		private eventService: EventService
	) {}
	cart: any;
	total: number;
	ngOnInit() {
		if (this.authService.getToken()) {
			this.productService.getCart().subscribe((res) => {
				this.cartService.getCart(res.data).subscribe((response) => {
					this.cart = response.data;
					this.total = response.total;
					this.cart.map((product) => {
						product.image =
							GlobalVariables.staticImage + product.image;
					});
				});
			});
		} else {
			const cartArr = JSON.parse(localStorage.getItem('cart'));
			this.cartService.getCart(cartArr).subscribe((res) => {
				this.cart = res.data;
				this.total = res.total;
				this.cart.map((product) => {
					product.image = GlobalVariables.staticImage + product.image;
				});
			});
		}
	}
	removeCartItem(item) {
		if (this.authService.getToken()) {
			this.cartService.removeCartItem(item).subscribe((res) => {
				this.cart = res.data;
				this.total = res.total;
				this.eventService.changeMessage(this.cart.length);
				this.cart.map((product) => {
					product.image = GlobalVariables.staticImage + product.image;
				});
			});
		} else {
			let cartArr = JSON.parse(localStorage.getItem('cart'));
			cartArr.splice(cartArr.indexOf(item), 1);
			localStorage.setItem('cart', JSON.stringify(cartArr));
			this.cart = this.cart.filter((cartItem) => cartItem._id != item);
			if (this.cart.length > 0) {
				const total: any = this.cart.reduce((c1, c2) => {
					let d1 = c1.discount ? c1.discount : 0;
					let d2 = c2.discount ? c2.discount : 0;
					return {
						price:
							c1.price -
							(c1.price * d1) / 100 +
							c2.price -
							(c2.price * d2) / 100,
						discount: 0,
					};
				});
				this.total = parseFloat(total['price'].toFixed(2));
			} else {
				this.total = 0;
			}
			this.eventService.changeMessage(this.cart.length);
		}
	}
}
