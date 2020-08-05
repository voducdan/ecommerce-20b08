import { Component } from '@angular/core';
import { EventService } from './event-service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: [],
})
export class AppComponent {
	title = 'ECommerce 20B08';
	numCartItem: number = 0;

	constructor(private eventService: EventService) {}
	ngOnInit() {
		setTimeout(() => {
			this.eventService.currentMessage.subscribe((numCartItem) => {
				this.numCartItem = numCartItem;
			});
		}, 1);
	}
}
