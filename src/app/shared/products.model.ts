import { ICategory } from './category.model';
import { ITopic } from './topic.model';
import { IAuthor } from './author.model';

export interface IProduct {
	name: string;
	url: string;
	author: IAuthor;
	is_paid: Boolean;
	price: number;
	concurrency: string;
	discount: number;
	headline: string;
	num_students_enrolled: number;
	avg_rating: number;
	num_reviews: number;
	num_lectures: number;
	image: string;
	language: number;
	caption_languages: string[];
	created_at: Date;
	last_modified: Date;
	level: string;
	estimate_content_length: String;
	sections: ISection[];
	category: ICategory;
	topic: ITopic;
	requirements: string[];
	description: string;
	objectives: string[];
	incentives_list: string[];
}

export interface ISection {
	section_length: number;
	lecture_count: Number;
	title: String;
	items: IItem[];
}

export interface IItem {
	id: number;
	can_be_previewed: Boolean;
	item_length: String;
	description: string;
	learn_url: String;
	title: string;
}
