import { useState } from 'react';
import { useQuery } from 'react-query';

import { getPlaceInfo } from './api';
import { FetchingPlaceInfo } from './components';

import './App.css';

function App() {
	const [searchValue, setSearchValue] = useState('');
	const [valueForFetch, setValueForFetch] = useState('');

	const {
		isLoading,
		isError,
		data: placeInfo,
	} = useQuery(
		['placeInfo', valueForFetch],
		() => getPlaceInfo(valueForFetch),
		{
			staleTime: 1000 * 60, // 1min
			enabled: !!valueForFetch,
		}
	);

	const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		setValueForFetch(searchValue);
	};

	const renderPlaceInfo = () => {
		if (isLoading) {
			return <div>Loading...</div>;
		}

		if (isError) {
			return <div>Something went wrong</div>;
		}

		if (placeInfo) {
			return (
				<FetchingPlaceInfo
					isLoading={isLoading}
					isError={isError}
					place={placeInfo}
				/>
			);
		}
	};

	return (
		<div className="App">
			<form onSubmit={handleSubmit}>
				<label>
					Enter place id
					<input
						type="text"
						value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
					/>
				</label>
				<button type="submit" disabled={!searchValue}>
					Search
				</button>
			</form>
			{renderPlaceInfo()}
		</div>
	);
}

export default App;
