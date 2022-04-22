import { useMemo } from 'react';
import { Place } from '../../types';
import { groupOpeningDays } from './utils';

type FetchingPlaceInfoProps = {
	place: Place;
	isLoading: boolean;
	isError: boolean;
};

export const FetchingPlaceInfo = ({
	place,
	isLoading,
	isError,
}: FetchingPlaceInfoProps) => {
	const openingHours = useMemo(
		() => groupOpeningDays(place.opening_hours.days),
		[place.opening_hours.days]
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Something went wrong</div>;
	}

	if (place) {
		return (
			<div>
				<div>
					<h2>{place.name}</h2>
					<h4>{place.address}</h4>
				</div>
				<div>
					<h3>Opening hours</h3>
					{openingHours.map(day => (
						<div>
							<div>{day.label}</div>
							<div>
								{day.openings.length === 0 ? (
									<div>closed</div>
								) : (
									day.openings.map(opening => (
										<span>
											{opening.end} - {opening.end}
										</span>
									))
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return null;
};
