import axios from "axios";

export class API {

	static #baseURL = "https://frontend-take-home-service.fetch.com";

	static #get(url: string, params: {[key: string]: any} = {}) {
		return axios.get(`${this.#baseURL}${url}`, {
			params,
			withCredentials: true,
			headers: {
				SameSite: "None"
			}
		})
	}

	static #post(url: string, body: {[key: string]: any}) {
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
	static async authLogin(name: string | User, email?: string): Promise<void> {
		if (!email && typeof name === "string") {
			throw "Email was not provided"
		}

		const user = typeof name === "string"? {name, email}: name;
		const res = await this.#post("/auth/login", user);

		if (res.status !== 200) {
			throw res
		}
	}


	/**
	 * POST /auth/logout
	 * 
	 * Hit this endpoint to end a user’s session. 
	 * This will invalidate the auth cookie.
	 * */
	static async authLogout(): Promise<void> {
	 	const res = await this.#post("/auth/logout", {});

	 	if (res.status !== 200) {
	 		throw res
	 	}
	}

	/**
	 * GET /dogs/breeds
	 * 
	 * Returns an array of all possible breed names.
	 * */
	static async dogsBreeds(): Promise<Breed[]> {
		const res = await this.#get("/dogs/breeds");

		if (res.status !== 200) {
			throw res
		}

		return res.data;
	}

	/**
	 * GET next or prev /dogs/search
	 * */
	static async query(query: string): Promise<SearchResult> {
		const res = await this.#get(query);

		if (res.status !== 200) {
			throw res
		}

		return res.data;
	}

	/**
	 * GET /dogs/search
	 * */
	static async dogsSearch(params: SearchParams): Promise<SearchResult> {
		const res = await this.#get("/dogs/search", params);

		if (res.status !== 200) {
			throw res
		}

		return res.data;
	}

	/**
	 * POST /dogs
	 * */
	static async dogs(dogIDs: string[]): Promise<Dog[]> {
		const res = await this.#post("/dogs", dogIDs);

		if (res.status !== 200) {
			throw res
		}

		return res.data;
	}

	/**
	 * POST /dogs/match
	 * 
	 * This endpoint will select a single ID from the provided list 
	 * of dog IDs. This ID represents the dog the user has been 
	 * matched with for adoption.
	 * */
	static async dogsMatch(dogIDs: string[]): Promise<Match> {
		const res = await this.#post("/dogs/match", dogIDs);

		if (res.status !== 200) {
			throw res
		}

		return res.data;
	}

	/**
	 * POST /locations
	 * */
	static async locations(zip_codes: string[]): Promise<Location[]> {
		const res = await this.#post("/locations", zip_codes);

		if (res.status !== 200) {
			throw res
		}

		return res.data;
	}

	/**
	 * POST /locations/search
	 * 
	 * This endpoint will select a single ID from the provided list 
	 * of dog IDs. This ID represents the dog the user has been 
	 * matched with for adoption.
	 * */
	static async locationsSearch(params: LocationParams): Promise<LocationResult> {
		const res = await this.#post("/locations/search", params);

		if (res.status !== 200) {
			throw res
		}
		return res.data;
	}

}