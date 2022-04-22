import { useMemo } from 'react';
import { Place } from '../../types';
import { groupOpeningDays } from './utils';

import './fetchingPlaceInfo.css';

type FetchingPlaceInfoProps = {
	place: Place;
	isLoading: boolean;
	isError: boolean;
};

export const FetchingPlaceInfo = ({ place }: FetchingPlaceInfoProps) => {
	const openingHours = useMemo(
		() => groupOpeningDays(place.opening_hours.days),
		[place.opening_hours.days]
	);

	return (
		<div className="fetching-place-info__container">
			<div>
				<h2>{place.name}</h2>
				<h4>{place.address}</h4>
			</div>
			<div>
				<h3>Opening hours</h3>
				{openingHours.map(day => (
					<div className="fetching-place-info__grouped-days">
						<div>{day.label}</div>
						<div className="fetching-place-info__grouped-days__working-hours">
							{day.openings.length === 0 ? (
								<div>closed</div>
							) : (
								day.openings.map(opening => (
									<span>
										{opening.start} - {opening.end}
									</span>
								))
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
