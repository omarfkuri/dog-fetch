import { AbsFetch } from "./AbsFetch";
import axios from "axios";

export class API extends AbsFetch {

	#baseURL = "https://frontend-take-home-service.fetch.com";

	private async get(
		url: string, 
		params: {[key: string]: any} = {}
	) {
		return axios.get(`${this.#baseURL}/${url}`, {
			params,
			withCredentials: true,
			headers: {
				SameSite: "None"
			}
		})
	}

	private async post(
		url: string, 
		body: {[key: string]: any}
	) {
		return axios.post(`${this.#baseURL}/${url}`, body, {
			withCredentials: true,
			headers: {
				SameSite: "None"
			}
		})
	}

	async authLogin(name: string | User, email?: string): Promise<Res> {

		if (!email && typeof name === "string") {
			return {
				ok: false,
				error: "Email was not provided"
			}
		}

		const user = typeof name === "string"? {name, email}: name;

		try {
			const res = await this.post("auth/login", user);

			if (res.status !== 200) {
				throw res
			}

			return {ok: true}

		}
		catch (error) {
			return {
				ok: false, 
				error: String(error)
			}
		}
	}

	async authLogout(): Promise<Res> {
		try {
			const res = await this.post("auth/logout", {});

			if (res.status !== 200) {
				throw res
			}

			return {ok: true}

		}
		catch (error) {
			return {
				ok: false, 
				error: String(error)
			}
		}
	}

	async dogsBreeds(): Promise<ResData<Breed[]>> {
		try {
			const res = await this.get("dogs/breeds");

			if (res.status !== 200) {
				throw res
			}

			return {
				ok: true,
				data: res.data
			}

		}
		catch (error) {
			return {
				ok: false, 
				error: String(error)
			}
		}
	}

	async dogsSearch(params: SearchParams): Promise<ResData<SearchResult>> {
		try {
			const res = await this.get("dogs/search", params);

			if (res.status !== 200) {
				throw res
			}

			return {
				ok: true,
				data: res.data
			}

		}
		catch (error) {
			return {
				ok: false, 
				error: String(error)
			}
		}
	}

	async dogs(dogIDs: string[]): Promise<ResData<Dog[]>> {
		try {
			const res = await this.post("dogs", dogIDs);

			if (res.status !== 200) {
				throw res
			}

			return {
				ok: true,
				data: res.data
			}

		}
		catch (error) {
			return {
				ok: false, 
				error: String(error)
			}
		}
	}

	async dogsMatch(dogIDs: string[]): Promise<ResData<Dog[]>> {
		try {
			const res = await this.post("dogs/match", dogIDs);

			if (res.status !== 200) {
				throw res
			}

			return {
				ok: true,
				data: res.data
			}

		}
		catch (error) {
			return {
				ok: false, 
				error: String(error)
			}
		}
	}

	async locations(zip_codes: string[]): Promise<ResData<Dog[]>> {
		try {
			const res = await this.post("locations", zip_codes);

			if (res.status !== 200) {
				throw res
			}

			return {
				ok: true,
				data: res.data
			}

		}
		catch (error) {
			return {
				ok: false, 
				error: String(error)
			}
		}
	}

	async locationsSearch(params: LocationParams): Promise<ResData<LocationResult>> {
		try {
			const res = await this.post("locations/search", params);

			if (res.status !== 200) {
				throw res
			}

			return {
				ok: true,
				data: res.data
			}

		}
		catch (error) {
			return {
				ok: false, 
				error: String(error)
			}
		}
	}

}