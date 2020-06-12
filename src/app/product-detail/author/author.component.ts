import { Component, OnInit, Input } from '@angular/core';

import { IAuthor } from '../../shared/author.model';

@Component({
	selector: 'app-product-detail-author',
	templateUrl: './product-detail-author.component.html',
	styleUrls: ['./product-detail-author.component.css'],
})
export class AuthorComponent implements OnInit {
	constructor() {}
	@Input() author: IAuthor;
	ngOnInit(): void {}
}
