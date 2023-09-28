import { API } from "./API";

export interface ShowDogFn {
	(srch: SearchResult, reset?: boolean): Promise<void>
}

export class BreedSet extends Set<Breed> {
	
	#sort: Sort = "breed:asc";

	addBreed(value: Breed, showDogs: ShowDogFn) {
	  super.add(value);
	  return this.#updateDogs(showDogs);
	}

	remBreed(value: Breed, showDogs: ShowDogFn) {
	  super.delete(value);
	  return this.#updateDogs(showDogs);
	}

	sortBy(sort: Sort, showDogs: ShowDogFn) {
		this.#sort = sort;
	  return this.#updateDogs(showDogs);
	}

	async #updateDogs(showDogs: ShowDogFn) {
	  const res = await API.dogsSearch({breeds: [...this], sort: this.#sort})
	  await showDogs(res, true);
	}
}