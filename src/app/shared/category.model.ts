export interface ICategory {
	title: string;
	url: string;
	slug: String;
	parents_category: ICategory;
}
