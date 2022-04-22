import { Place } from '../types';

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
				</div>
			</div>
		);
	}

	return null;
};
