import { Component, OnInit, Input } from '@angular/core';

import { ISection } from '../../shared/products.model';

@Component({
	selector: 'app-product-detail-content',
	templateUrl: './product-detail-content.component.html',
	styleUrls: ['./product-detail-content.component.css'],
})
export class ContentComponent implements OnInit {
	constructor() {}
	@Input() sections: ISection;
	@Input() num_lectures: number;
	@Input() estimate_content_length: number;
	isExpand = false;
	ngOnInit(): void {}
	expandAll() {
		this.isExpand = !this.isExpand;
	}
}
