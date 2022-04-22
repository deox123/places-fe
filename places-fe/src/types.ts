// TODO reuse types from BE
export interface Place {
	name: string;
	address: string;
	opening_hours: OpeningHours;
}
export interface OpeningHours {
	days: Days;
	closed_on_holidays: boolean;
	open_by_arrangement: boolean;
}
export interface Days {
	monday?: Day[] | null;
	tuesday?: Day[] | null;
	wednesday?: Day[] | null;
	thursday?: Day[] | null;
	friday?: Day[] | null;
	saturday?: Day[] | null;
	sunday?: Day[] | null;
}
export interface Day {
	start: string;
	end: string;
}

export interface GroupedDays {
	label: string;
	openings: Day[];
}
