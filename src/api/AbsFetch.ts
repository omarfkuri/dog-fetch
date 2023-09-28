


export abstract class AbsFetch {

	/**
	 * POST /auth/login
	 * 
	 * Response
	 * 200 OK
	 * 
	 * An auth cookie, `fetch-access-token`, will be included in the 
	 * response headers. This will expire in 1 hour.
	 * */
	abstract authLogin(user: User): Promise<Res>
	abstract authLogin(name: string, email: string): Promise<Res>

	/**
	 * POST /auth/logout
	 * 
	 * Hit this endpoint to end a user’s session. 
	 * This will invalidate the auth cookie.
	 * */
	abstract authLogout(): Promise<Res>

	/**
	 * GET /dogs/breeds
	 * 
	 * Returns an array of all possible breed names.
	 * */
	abstract dogsBreeds(): Promise<ResData<Breed[]>>

	/**
	 * GET /dogs/search
	 * */
	abstract dogsSearch(params: SearchParams): Promise<ResData<SearchResult>>

	/**
	 * POST /dogs
	 * */
	abstract dogs(dogIDs: string[]): Promise<ResData<Dog[]>>

	/**
	 * POST /dogs/match
	 * 
	 * This endpoint will select a single ID from the provided list 
	 * of dog IDs. This ID represents the dog the user has been 
	 * matched with for adoption.
	 * */
	abstract dogsMatch(dogIDs: string[]): Promise<ResData<Dog[]>>

	/**
	 * POST /locations
	 * */
	abstract locations(zip_codes: string[]): Promise<ResData<Dog[]>>

	/**
	 * POST /locations/search
	 * 
	 * This endpoint will select a single ID from the provided list 
	 * of dog IDs. This ID represents the dog the user has been 
	 * matched with for adoption.
	 * */
	abstract locationsSearch(params: LocationParams): Promise<ResData<LocationResult>>
}