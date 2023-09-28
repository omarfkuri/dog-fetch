import axios from "axios";

export class API {

	static #baseURL = "https://frontend-take-home-service.fetch.com";

	private static async get(
		url: string, 
		params: {[key: string]: any} = {}
	) {
		return axios.get(`${this.#baseURL}${url}`, {
			params,
			withCredentials: true,
			headers: {
				SameSite: "None"
			}
		})
	}

	private static async post(
		url: string, 
		body: {[key: string]: any}
	) {
		return axios.post(`${this.#baseURL}${url}`, body, {
			withCredentials: true,
			headers: {
				SameSite: "None"
			}
		})
	}

	/**
	 * POST /auth/login
	 * 
	 * Response
	 * 200 OK
	 * 
	 * An auth cookie, `fetch-access-token`, will be included in the 
	 * response headers. This will expire in 1 hour.
	 * */
	static async authLogin(name: string | User, email?: string): Promise<Res> {

		if (!email && typeof name === "string") {
			return {
				ok: false,
				error: "Email was not provided"
			}
		}

		const user = typeof name === "string"? {name, email}: name;

		try {
			const res = await this.post("/auth/login", user);

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


	/**
	 * POST /auth/logout
	 * 
	 * Hit this endpoint to end a user’s session. 
	 * This will invalidate the auth cookie.
	 * */
	static async authLogout(): Promise<Res> {
		try {
			const res = await this.post("/auth/logout", {});

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

	/**
	 * GET /dogs/breeds
	 * 
	 * Returns an array of all possible breed names.
	 * */
	static async dogsBreeds(): Promise<ResData<Breed[]>> {
		try {
			const res = await this.get("/dogs/breeds");

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

	/**
	 * GET next or prev /dogs/search
	 * */

	static async query(query: string): Promise<ResData<SearchResult>> {
		try {
			const res = await this.get(query);

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

	/**
	 * GET /dogs/search
	 * */
	static async dogsSearch(params: SearchParams): Promise<ResData<SearchResult>> {
		try {
			const res = await this.get("/dogs/search", params);

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

	/**
	 * POST /dogs
	 * */
	static async dogs(dogIDs: string[]): Promise<ResData<Dog[]>> {
		try {
			const res = await this.post("/dogs", dogIDs);

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

	/**
	 * POST /dogs/match
	 * 
	 * This endpoint will select a single ID from the provided list 
	 * of dog IDs. This ID represents the dog the user has been 
	 * matched with for adoption.
	 * */
	static async dogsMatch(dogIDs: string[]): Promise<ResData<Match>> {
		try {
			const res = await this.post("/dogs/match", dogIDs);

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

	/**
	 * POST /locations
	 * */
	static async locations(zip_codes: string[]): Promise<ResData<Dog[]>> {
		try {
			const res = await this.post("/locations", zip_codes);

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

	/**
	 * POST /locations/search
	 * 
	 * This endpoint will select a single ID from the provided list 
	 * of dog IDs. This ID represents the dog the user has been 
	 * matched with for adoption.
	 * */
	static async locationsSearch(params: LocationParams): Promise<ResData<LocationResult>> {
		try {
			const res = await this.post("/locations/search", params);

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