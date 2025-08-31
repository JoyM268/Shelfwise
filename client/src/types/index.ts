import type { ChangeEvent, FormEvent, ReactNode } from "react";

export type BookId = string | undefined;

export type BookStatus = "Reading" | "Plan to Read" | "Finished";

export interface BookDataProps {
	id: string;
	src: string;
	title: string;
	authors: string[];
	status: BookStatus;
	progress: number;
	total: number;
}

export interface Book {
	id: string;
	title: string;
	authors: string[];
	publisher: string;
	publishedDate: string;
	description: string;
	isbn: string;
	pageCount: number;
	dimensions: {
		height: string;
		width: string;
		thickness: string;
	};
	categories: string[];
	averageRating: number;
	ratingsCount: number;
	imageLinks: {
		smallThumbnail: string;
		thumbnail: string;
	};
	language: string;
	status: BookStatus | null;
}

export interface ExploreProps {
	handleSearch(event: ChangeEvent<HTMLInputElement>): void;
	search: string;
	results: boolean;
	query: string | null;
	handleSubmit: (event?: FormEvent<HTMLFormElement>) => void;
}

export interface BookCarouselProps {
	title: string;
	search_query: string;
}

export interface BookData {
	id: string;
	src: {
		smallThumbnail: string;
		thumbnail: string;
	};
	title: string;
	authors: string[];
}

export interface HomeProps {
	handleSearch(event: ChangeEvent<HTMLInputElement>): void;
	search: string;
	showResults(): void;
}

export interface SearchProps {
	search: string;
	handleSearch(event?: ChangeEvent<HTMLInputElement>): void;
}

export interface RatingProps {
	rating: number;
	ratingsCount: number;
}
export interface RadioDialogProps {
	children: ReactNode;
	value: string;
	onValueChange: (value: string) => void;
	options?: string[];
	title: string;
	description: string;
}

export interface SearchCarouselProps {
	books: BookData[] | null;
	loading: boolean;
	error: null | string;
}

export interface StatusDropdownMenuProps {
	id: string;
	changeStatus(id: string, status: BookStatus): void;
	handleBookRemove(id: string): void;
	status: BookStatus;
}

export interface PublicationInfoProps {
	publisher: string;
	publishedDate: string;
	pageCount: number;
	language: string;
	dimensions: {
		height: string;
		width: string;
		thickness: string;
	};
	isbn: string;
}

export interface ProfilePhotoProps {
	name: string;
	imgSrc?: string;
	imgAlt?: string;
}

export interface LogoutWarningProps {
	open: boolean;
	onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
	handleLogout: () => void;
}

export interface HeaderProps {
	menu: boolean;
	setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface EmptyMessageProps {
	title: string;
	description: string;
	buttonText?: string;
	link?: string;
}

export interface ButtonProps {
	onClick?: () => void;
	classname?: string;
	text?: string;
	children?: string;
	type?: "button" | "submit";
	disabled?: boolean;
}

export interface BookRemoveWarningProps {
	id: string;
	handleBookRemove(id: string): void;
	alert: boolean;
	setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BookDescriptionProps {
	description: string;
	lines: number;
}

export interface BookProps {
	id: string;
	src: string;
	title: string;
	authors: string[];
	progress?: number;
	status?: BookStatus;
	changeStatus?: (id: string, status: BookStatus) => void;
	handleBookRemove?: (id: string) => void;
}

export interface DecodedUser {
	token_type: string;
	exp: number;
	iat: number;
	jti: string;
	user_id: number;
	username: string;
	name: string;
}

export interface AuthTokens {
	access: string;
	refresh: string;
}

export interface AuthContextProps {
	user: DecodedUser | null;
	tokens: AuthTokens | null;
	login: (tokens: AuthTokens) => void;
	logout: () => void;
}
