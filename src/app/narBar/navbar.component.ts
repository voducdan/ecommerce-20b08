import { Component } from '@angular/core';
import { NavBarService } from './navbar-service';
import { ICategory } from '../shared/category.model';


@Component({
	selector: 'app-nav-bar',
	templateUrl: './navBar.component.html',
	styleUrls: ['./navBar.component.css'],
})
export class NavBarComponent {

	categories:ICategory;
	constructor(private navBarService:NavBarService){
		this.navBarService.getCategories().subscribe(res=>{
			this.categories = res.data
		})
	}
}
