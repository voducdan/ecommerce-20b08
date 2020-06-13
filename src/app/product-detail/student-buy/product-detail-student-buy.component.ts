import { Component, OnInit, Input } from '@angular/core';

import { IProduct } from '../../shared/products.model';

@Component({
	selector: 'app-product-detail-student-buy',
	templateUrl: './product-detail-student-buy.component.html',
	styleUrls: ['./product-detail-student-buy.component.css'],
})
export class StudentBuyComponent implements OnInit {
	constructor() {}
	@Input() products: IProduct[];
	ngOnInit(): void {}
}
