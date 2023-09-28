import { API } from "./API";

export interface ShowFavsFn {
	(dogs: Dog[], reset?: boolean): Promise<void>
}

export class FavsSet extends Set<string> {
	

	async addFav(value: string, showFavs: ShowFavsFn) {
	  super.add(value);
	  const res = await API.dogs([...this])
	  if (!res.ok) {
	  	throw res.error;
	  }
	  await showFavs(res.data, true);
	}

	async remFav(value: string, showFavs: ShowFavsFn) {
	  super.delete(value);
	  const res = await API.dogs([...this])
	  if (!res.ok) {
	  	throw res.error;
	  }
	  await showFavs(res.data, true);
	}
}