import { http } from './http';

export const getPlaceInfo = (placeId: string) =>
	http.get('/place-info', { params: { placeId } }).then(res => res.data);
