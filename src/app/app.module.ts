import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

import { AppComponent } from './app.component';
import { NavComponent } from './nav.component';

@NgModule({
	declarations: [AppComponent, NavComponent],
	imports: [RouterModule.forRoot(appRoutes), BrowserModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
