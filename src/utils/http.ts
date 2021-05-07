/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import axios from 'axios';

interface IQueryParam {
	key: string;
	value: string | number;
}

const apiRouteGenerator = (route: string, idParam?: number, query?: IQueryParam[]) => {
	let url = `${process.env.REACT_APP_API_URL}${route}`;
	if (idParam) {
		url = `${url}/${idParam}`;
	}
	if (query && query.length > 0) {
		const searchParams = new URLSearchParams();
		for (const item of query) {
			searchParams.append(item.key, item.value as string);
		}
		return `${url}?${searchParams.toString()}`;
	}
	return url;
};

class HttpClientHelper {
	async get<T>(path: string, idParam?: number, query?: IQueryParam[]) {
		try {
			const endpoint = apiRouteGenerator(path, idParam, query);
			const response = await axios.get<T>(endpoint);
			return response.data;
		} catch (ex) {
			console.log(ex);
			return {} as T;
		}
	}

	async post<T, U>(path: string, payload?: U, idParam?: number, headerConfig?: any) {
		try {
			const endpoint = apiRouteGenerator(path, idParam);
			const { data } = await axios.post<T>(endpoint, payload, headerConfig);
			return data;
		} catch (ex) {
			console.log(ex);
			return {} as T;
		}
	}

	async put<T, U>(path: string, payload: U, idParam?: number) {
		try {
			const endpoint = apiRouteGenerator(path, idParam);
			const { data } = await axios.put<T>(endpoint, payload);
			return data;
		} catch (ex) {
			console.log(ex);
			return {} as T;
		}
	}

	async patch<T, U>(path: string, payload: U, idParam?: number) {
		try {
			const endpoint = apiRouteGenerator(path, idParam);
			const { data } = await axios.patch<T>(endpoint, payload);
			return data;
		} catch (ex) {
			console.log(ex);
			return {} as T;
		}
	}

	async delete<T, U = {}>(path: string, payload?: U, idParam?: number) {
		try {
			const endpoint = apiRouteGenerator(path, idParam);
			const { data } = await axios.delete<T>(endpoint, { data: payload });
			return data;
		} catch (ex) {
			console.log(ex);
			return {} as T;
		}
	}
}

export const ApiHelper = new HttpClientHelper();
