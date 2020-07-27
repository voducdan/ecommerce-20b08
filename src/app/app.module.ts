import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appRoutes } from './routes';

import { AppComponent } from './app.component';
import { ProductComponent } from './products/products.component';
import { SharedModule } from './shared/shared.module';
import { NavBarComponent } from './narBar/navbar.component';
import { AboutComponent } from './about-us/about.component';
import { SearchCoursesComponent } from './search-courses/search-courses.component';
@NgModule({
	declarations: [
		AppComponent,
		ProductComponent,
		NavBarComponent,
		AboutComponent,
		SearchCoursesComponent,
	],
	imports: [
		RouterModule.forRoot(appRoutes),
		BrowserModule,
		HttpClientModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
