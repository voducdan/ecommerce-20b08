import { Component, OnInit, Input } from '@angular/core';

import { IProduct } from '../../shared/products.model';

@Component({
	selector: 'app-product-detail-banner',
	templateUrl: './product-detail-banner.component.html',
	styleUrls: [
		'./product-detail-banner.component.css',
		'./product-detail-previewbox.component.css',
	],
})
export class BannerComponent implements OnInit {
	constructor() {}
	@Input() product: IProduct;
	ngOnInit(): void {}
}
