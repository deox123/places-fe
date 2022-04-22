import { Days } from '../../types';
import { daysWithSameOpening, groupOpeningDays } from './utils';

// TODO change mock data to be as minimal and clear as possible
const mockDays1: Days = {
	monday: [
		{ start: '11:30', end: '14:00' },
		{ start: '18:30', end: '22:00' },
	],
	tuesday: [
		{ start: '11:30', end: '14:00' },
		{ start: '18:30', end: '22:00' },
	],
	wednesday: [
		{ start: '11:30', end: '14:00' },
		{ start: '18:30', end: '22:00' },
	],
	thursday: [
		{ start: '11:30', end: '14:00' },
		{ start: '18:30', end: '22:00' },
	],
	friday: [
		{ start: '11:30', end: '14:00' },
		{ start: '18:30', end: '22:00' },
	],
};

const mockDays2: Days = {
	tuesday: [
		{ start: '11:30', end: '15:00' },
		{ start: '18:30', end: '00:00' },
	],
	wednesday: [
		{ start: '11:30', end: '15:00' },
		{ start: '18:30', end: '00:00' },
	],
	thursday: [
		{ start: '11:30', end: '15:00' },
		{ start: '18:30', end: '00:00' },
	],
	friday: [
		{ start: '11:30', end: '15:00' },
		{ start: '18:30', end: '00:00' },
	],
	saturday: [{ start: '18:00', end: '00:00' }],
	sunday: [{ start: '11:30', end: '15:00' }],
};

describe('daysWithSameOpening', () => {
	it('should return true if both days are undefined', () => {
		const result = daysWithSameOpening(null, null);

		expect(result).toEqual(true);
	});

	it('should return true if all openings are the same', () => {
		const result = daysWithSameOpening(mockDays1.monday, mockDays1.tuesday);

		expect(result).toEqual(true);
	});

	it('should return false if one opening start is different', () => {
		const result = daysWithSameOpening(mockDays2.friday, mockDays2.saturday);

		expect(result).toEqual(false);
	});

	it('should return false if one day is undefined', () => {
		const result = daysWithSameOpening(mockDays1.friday, mockDays1.saturday);

		expect(result).toEqual(false);
	});

	it('should return false if number of opening hours are not the same', () => {
		const result = daysWithSameOpening(mockDays2.friday, mockDays2.saturday);

		expect(result).toEqual(false);
	});
});

describe('groupOpeningDays', () => {
	it('should use the name of the leading day in the group', () => {
		const result = groupOpeningDays(mockDays1);

		expect(result).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ label: expect.stringMatching(/^saturday/) }),
			])
		);
	});

	it('should use the name of the last day in the group', () => {
		const result = groupOpeningDays(mockDays1);

		expect(result).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ label: expect.stringMatching(/sunday$/) }),
			])
		);
	});

	it('should not add dash to single day group', () => {
		const result = groupOpeningDays(mockDays2);

		expect(result).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ label: expect.not.stringContaining('-') }),
			])
		);
	});

	it('should set empty array to non-open days', () => {
		const result = groupOpeningDays(mockDays1);

		expect(result).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ openings: expect.arrayContaining([]) }),
			])
		);
	});
});
