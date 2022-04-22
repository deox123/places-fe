import { Place } from '../types';
import { http } from './http';

export const getPlaceInfo = (placeId: string): Promise<Place> =>
	http.get('/place-info', { params: { placeId } }).then(res => res.data);
