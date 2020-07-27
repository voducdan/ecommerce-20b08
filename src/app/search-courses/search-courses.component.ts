import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchCourseService } from './search-course.service';
import { IProduct } from '../shared/products.model';
import { GlobalVariables } from '../global';
@Component({
	templateUrl: './search-courses.component.html',
	styleUrls: ['./search-courses.component.css'],
})
export class SearchCoursesComponent {
	level: string;
	s: string;
	is_paid: boolean;
	avg_rating: number;
	courses: IProduct[];
	constructor(
		private searchCourseService: SearchCourseService,
		private route: ActivatedRoute
	) {}
	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			this.s = params.s;
			this.searchCourseService
				.getCoursesByName(params.s)
				.subscribe((res) => {
					this.courses = res.data;
					this.courses.map((product) => {
						product.image =
							GlobalVariables.staticImage + product.image;
					});
				});
		});
	}
	filterLevel(level) {
		this.level = level;
		this.filterCourse();
	}

	filterRating(rate) {
		this.avg_rating = rate;
		this.filterCourse();
	}

	filterPrice(price) {
		this.is_paid = price;
		this.filterCourse();
	}

	filterCourse() {
		const filter = {
			s: this.s,
			level: this.level,
			is_paid: this.is_paid,
			avg_rating: this.avg_rating,
		};
		this.searchCourseService.searchCourse(filter).subscribe((res) => {
			this.courses = res.data;
			this.courses.map((product) => {
				product.image = GlobalVariables.staticImage + product.image;
			});
		});
	}
}
