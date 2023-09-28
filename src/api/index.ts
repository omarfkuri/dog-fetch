// import { sleep } from "../funcs/sleep";

import { API } from "./API";
import { AbsFetch } from "./AbsFetch";


export const api: AbsFetch = new API();


// export async function getBreeds(): Promise<Breed[]> {
// 	await sleep(500);

// 	return [
// 		"Afghan", "Rottweiler", "Labrador", 
// 		"Chihuahua", "Dachshund"
// 	]
// }

// export class Auth {
// 	static #listener: Listener | null = null;
// 	static #AUTH: {user: User | null} = {user: null};

// 	static onChange(newListener: Listener) {
// 		this.#listener = newListener;
// 	}
// 	static async login(name: string, email: string) {
// 		await sleep(500);
// 		// const position = await getPosition();

// 		// console.log(position)

// 		this.#AUTH.user = {name, email};
// 		this.#listener?.(this.#AUTH);
// 	}

// 	static async logout(name: string, email: string) {
// 		await sleep(500);
// 		this.#AUTH.user = null;
// 		this.#listener?.(this.#AUTH);
// 	}
// }

// export async function searchDogs(params: SearchParams): Promise<string[] | null> {
// 	await sleep(500);
// 	if (!DOGS)
// 		await fill();
// 	return DOGS!.filter(({breed}) => params.breeds.includes(breed)).map(({id}) => id) || null;
// }

// export async function matchDogs(ids: string[]): Promise<Dog[] | null> {
// 	if (!DOGS)
// 		await fill();
// 	return DOGS!.filter((e): e is Dog => ids.includes(e.id)) || null;
// }

// async function fill() {

// 	const res = await fetch("/dogs.json");
// 	const dogs: Dog[] = await res.json();

// 	DOGS = dogs;
// }

// function getPosition() {
// 	return new Promise<GeolocationPosition>((res, rej) => 
// 		navigator.geolocation.getCurrentPosition(res, rej)
// 	)
// }

// let DOGS: Dog[] | null = null;
