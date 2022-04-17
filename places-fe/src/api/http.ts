import axios from 'axios';

export const http = axios.create({
	// TODO use env varaibles
	baseURL: 'http://localhost:4000',
});
