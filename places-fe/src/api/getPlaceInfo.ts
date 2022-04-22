import { Place } from '../types';
import { http } from './http';

export const getPlaceInfo = (placeId: string) =>
	http.get<Place>('/place-info', { params: { placeId } }).then(res => res.data);
