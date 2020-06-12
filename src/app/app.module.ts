import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { appRoutes } from './routes';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { RevenueComponent } from './revenue/revenue.component';
import { ProductComponent } from './products/products.component';
import { ProductThumnail } from './shared/product.thumnail/product.thumnail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
	declarations: [
		AppComponent,
		RevenueComponent,
		ProductComponent,
		ProductThumnail,
		ProductDetailComponent,
	],
	imports: [
		RouterModule.forRoot(appRoutes),
		BrowserModule,
		HttpClientModule,
		ChartsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
