import { Component } from '@angular/core';
import { IProduct } from 'src/app/shared/products.model';
import { UserService } from '../user.services';
import { GlobalVariables } from 'src/app/global';

@Component({
	templateUrl: './user-courses.component.html',
	styleUrls: ['./user-courses.component.css'],
})
export class UserCousesComponent {
	products: IProduct[];
	constructor(private userService: UserService) {}

	ngOnInit() {
		this.userService.getUserCourses().subscribe((res) => {
			this.products = res.data['enrolled_courses'];
			this.products.map((product) => {
				product.image = GlobalVariables.staticImage + product.image;
			});
		});
	}
}
