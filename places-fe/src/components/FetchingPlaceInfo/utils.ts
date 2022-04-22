import { Days, Day, GroupedDays } from '../../types';

const DAYS = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday',
] as const;

export const groupOpeningDays = (days: Days): GroupedDays[] => {
	let start: string = DAYS[0];
	let end: string = DAYS[0];
	let grouped: GroupedDays[] = [];

	DAYS.forEach((day, index) => {
		if (!daysWithSameOpening(days[day], days[DAYS[index + 1]])) {
			grouped.push({
				label: generateLabel(start, end),
				openings: days[day] ?? [],
			});
			start = DAYS[index + 1];
			end = DAYS[index + 1];
		} else {
			end = DAYS[index];
			if (!DAYS[index + 1]) {
				grouped.push({
					label: generateLabel(start, end),
					openings: days[day] ?? [],
				});
			}
		}
	});

	return grouped;
};

const generateLabel = (start: string, end: string): string => {
	if (start === end) {
		return start;
	}
	return start + ' - ' + end;
};

export const daysWithSameOpening = (
	day1: Day[] | null | undefined,
	day2: Day[] | null | undefined
): boolean => {
	if (!day1 && !day2) {
		return true;
	}

	if ((!day1 && day2) || (day1 && !day2)) {
		return false;
	}

	if (day1?.length !== day2?.length) {
		return false;
	}

	return (day1 as Day[]).every((opening, index) => {
		if (
			opening.end === day2?.[index].end &&
			opening.start === day2?.[index].start
		) {
			return true;
		}
		return false;
	});
};
