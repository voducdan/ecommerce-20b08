import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: ` <h2>Angular</h2>
		<router-outlet></router-outlet>`,
	styles: [],
})
export class AppComponent {
	title = 'Projects';
}
