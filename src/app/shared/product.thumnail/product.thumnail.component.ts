import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-products-thumnail',
	templateUrl: './product.thumnail.component.html',
	styleUrls: ['./product.thumnail.component.css'],
})
export class ProductThumnail {
	constructor() {}

	@Input() product: any;

	ngOnInit() {}
}
