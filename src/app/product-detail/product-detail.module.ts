import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { productDetailRoutes } from './product-detail.routes';

import { ProductDetailComponent } from './product-detail.component';
import { ReviewComponent } from './review/review.component';
import { BannerComponent } from './banner/banner.component';
import { ContentComponent } from './content/content.component';
import { AuthorComponent } from './author/author.component';
import { StudentBuyComponent } from './student-buy/product-detail-student-buy.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(productDetailRoutes),
	],
	declarations: [
		ReviewComponent,
		BannerComponent,
		ContentComponent,
		AuthorComponent,
		ProductDetailComponent,
		StudentBuyComponent,
	],
	providers: [],
})
export class ProductDetailModule {}
