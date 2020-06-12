import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { productDetailRoutes } from './product-detail.routes';

import { ProductDetailComponent } from './product-detail.component';
import { ReviewComponent } from './review/review.component';
import { BannerComponent } from './banner/banner.component';
import { ContentComponent } from './content/content.component';
import { AuthorComponent } from './author/author.component';

@NgModule({
	imports: [CommonModule, RouterModule.forChild(productDetailRoutes)],
	declarations: [
		ReviewComponent,
		BannerComponent,
		ContentComponent,
		AuthorComponent,
		ProductDetailComponent,
	],
	providers: [],
})
export class ProductDetailModule {}
