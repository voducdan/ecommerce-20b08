import { Component, SimpleChange, SimpleChanges } from "@angular/core";
import { NavBarService } from "./navbar-service";
import { ICategory } from "../shared/category.model";
import { UserService } from "../user/user.services";
import { IUser } from "../shared/user.model";
import { GlobalVariables } from "../global";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./navBar.component.html",
  styleUrls: ["./navBar.component.css"],
})
export class NavBarComponent {
  categories: ICategory;
  userInfo: IUser;
  constructor(
    private navBarService: NavBarService,
    private uService: UserService
  ) {}
  check: boolean;
  ngOnInit() {
    if (localStorage.getItem("token")) {
	  this.check = true;
	  if(localStorage.getItem('token')){
		this.uService.getUser().subscribe((res) => {
			this.userInfo = res.data;
			if (this.userInfo && this.userInfo.image) {
			this.userInfo.image = GlobalVariables.staticImage + this.userInfo.image;
		  }
		});
	}
    } else this.check = false;
    
    this.navBarService.getCategories().subscribe((res) => {
      this.categories = res.data;
    });
  }
  logOut() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  ngDoCheck() {
    if (localStorage.getItem("token")) {
	  this.check = true;
	} else this.check = false;
	
  }
}
