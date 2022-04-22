import { render, screen } from '@testing-library/react';
import { Place } from '../../types';
import { FetchingPlaceInfo } from './FetchingPlaceInfo';

const mockPlaceInfo: Place = {
	address: 'Rue de Conthey 17, 1950 Sion',
	name: 'Le Café du Marché',
	opening_hours: {
		days: {
			monday: [{ start: '11:30', end: '15:00' }],
		},
	},
};

const setup = (props?: unknown) => {
	render(
		<FetchingPlaceInfo
			place={mockPlaceInfo}
			isLoading={false}
			isError={false}
			{...props}
		/>
	);
};

describe('FetchingPlaceInfo', () => {
	it('should render place name', () => {
		setup();

		expect(screen.getByText('Le Café du Marché')).toBeInTheDocument();
	});

	it('should render place address', () => {
		setup();

		expect(
			screen.getByText('Rue de Conthey 17, 1950 Sion')
		).toBeInTheDocument();
	});

	it('should render place opening', () => {
		setup();

		expect(screen.getByText('monday')).toBeInTheDocument();
		expect(screen.getByText('11:30 - 15:00')).toBeInTheDocument();
	});

	it('should render "closed" if day has no openings', () => {
		const mockPlaceInfoWithAllClosedDays = {
			...mockPlaceInfo,
			opening_hours: {
				days: {},
			},
		};

		setup({ place: mockPlaceInfoWithAllClosedDays });
		expect(screen.getByText('closed')).toBeInTheDocument();
	});
});
