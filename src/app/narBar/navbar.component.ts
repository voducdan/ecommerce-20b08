import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NavBarService } from './navbar-service';
import { ICategory } from '../shared/category.model';
import { UserService } from '../user/user.services';
import { IUser } from '../shared/user.model';
import { GlobalVariables } from '../global';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './navBar.component.html',
	styleUrls: ['./navBar.component.css'],
})
export class NavBarComponent {
	categories: ICategory;
	userInfo: IUser;
	@Input() numCartItem: number = 0;
	constructor(
		private navBarService: NavBarService,
		private uService: UserService,
		private router: Router
	) {
		document.addEventListener('click', (event) => {
			this.showSuggestions = false;
		});
	}
	check: boolean;
	showSuggestions: boolean = false;
	searchSuggestionsRes: any;
	searchForm = new FormGroup({
		searchTerm: new FormControl(''),
	});
	@ViewChild('searchBox') searchBox: ElementRef;
	ngOnInit() {
		if (localStorage.getItem('token')) {
			this.check = true;
			if (localStorage.getItem('token')) {
				this.uService.getUser().subscribe((res) => {
					this.userInfo = res.data;
					if (this.userInfo && this.userInfo.image) {
						this.userInfo.image =
							GlobalVariables.staticImage + this.userInfo.image;
					}
				});
			}
		} else this.check = false;

		this.navBarService.getCategories().subscribe((res) => {
			this.categories = res.data;
		});
	}
	logOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('cart');
		window.location.href = '/';
	}

	ngDoCheck() {
		if (localStorage.getItem('token')) {
			this.check = true;
		} else this.check = false;
	}
	search() {
		if (this.searchForm.value['searchTerm'].length > 1) {
			this.showSuggestions = true;
			setTimeout(() => {
				this.navBarService
					.searchSuggestions(this.searchForm.value['searchTerm'])
					.subscribe((res) => {
						this.searchSuggestionsRes = Object.assign({}, res.data);
					});
			}, 100);
		}
	}

	hightlightSearchRes(title, key) {
		const idx = title.toUpperCase().indexOf(key.toUpperCase());
		const originalTitle = title.substr(idx, key.length);
		return title.replace(originalTitle, `<b>${originalTitle}</b>`);
	}

	onSearch() {
		this.searchBox.nativeElement.blur();
		this.showSuggestions = false;
		console.log(this.showSuggestions);
		this.router.navigate([`search/course`], {
			queryParams: { s: this.searchForm.value['searchTerm'] },
		});
	}
}
