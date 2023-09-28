import React, { useEffect, useState } from "react";
import { DogPreview } from "../comps/DogPreview";
import { API, FavsSet } from "../api";
import { CheckBox } from "../comps/CheckBox";
import { Label } from "../comps/Label";
import { BreedSet } from "../api/";
import { FavDogPreview } from "../comps/FavDogPreview";
import { MatchDogPreview } from "../comps/MatchDogPreview";

const filterBreeds = new BreedSet;
const favDogs = new FavsSet;

export default function Dogs({user, setUser}: {user: User, setUser(user: User|null): void}) {

	const [dogs, setDogs] = useState<Dog[] | null>(null);
	const [match, setMatch] = useState<Dog | null>(null);
	const [favs, setFavs] = useState<Dog[]>([]);
	const [breeds, setBreeds] = useState<Breed[] | null>(null);
	const [sort, setSort] = useState<Sort>("breed:asc");
	const [prevPage, setPrevPage] = useState<string | null>(null);
	const [nextPage, setNextPage] = useState<string | null>(null);
	const [currPage, setCurrPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);

	async function showPage(type: "next" | "prev", pageQuery: string) {
		const res = await API.query(pageQuery);	
		if (!res.ok) {
			throw res.error;
		}
		setCurrPage(currPage + (type === "next" ? 1 : -1))
		await showDogs(res.data);
	}

	async function showDogs(result: SearchResult, reset = false) {
		const dogs = await gatherDogs(result);
		if (reset) {
			setCurrPage(1);
		}
		setDogs(dogs);
		window.scrollTo({top: 0})

	}

	async function showFavs(result: Dog[], reset = false) {
		setFavs(result);
	}

	async function gatherDogs(result: SearchResult): Promise<Dog[]> {
		const res = await API.dogs(result.resultIds);
		if (!res.ok) {
			throw res.error;
		}

		setPageCount(Math.floor(result.total / result.resultIds.length));

		setPrevPage(result.prev || null)
		setNextPage(result.next || null)

		return res.data;
	}

	function DogButtons() {
		return (
			<div className="dog-buttons-wrapper">
				<div className="dog-buttons-button dog-buttons-button-prev">
					{prevPage && (
						<button onClick={() => showPage("prev", prevPage)}>Back</button>
					)}
				</div>
				<div className="dog-buttons-button dog-buttons-button-next">
					{nextPage && (
						<button onClick={() => showPage("next", nextPage)}>Next</button>
					)}
				</div>
			</div>
		)
	}

	useEffect(() => {
		
		API.dogsBreeds()
		.then(res => {
			if (!res.ok) {
				throw res.error;
			}
			setBreeds(res.data);
			return API.dogsSearch({sort});
		})
		.then(res => {
			if (!res.ok) {
				throw res.error;
			}
			return gatherDogs(res.data);
		})
		.then(setDogs)
		.catch(alert);

	}, [])

	return (
		<>
			<div id="sidebar">
				
				<div id="logo-container"></div>

				<div className="card dog-filter-wrapper">
					<h4>Filter Breeds</h4>	
					<div className="dog-filter-sort">
						<select
							onChange={(e) => {
								const {value} = e.target.selectedOptions[0];
								if (value === "breed:asc" || value === "breed:desc") {
									setSort(value);
									filterBreeds.sortBy(value, showDogs);
								}
							}}
						>
							<option defaultValue="breed:asc">A-Z</option>
							<option defaultValue="breed:desc">Z-A</option>
						</select>
					</div>
					<div className="dog-filter-breeds">
						{breeds 
							? breeds.map((breed, key) => (
									<Label display={breed} title={breed} key={key} reverse>
										<CheckBox 
											onChange={e => {
												if (e.target.checked) {
													filterBreeds.addBreed(breed, showDogs)
												}
												else {
													filterBreeds.remBreed(breed, showDogs)
												}
											}}
											startChecked={false} value={breed}/>
									</Label>
								))
							: <div>Loading breeds...</div>
						}

					</div>
				</div>

				<div className="card">
					<h5>{user.name}</h5>
					<button
						onClick={e => {
							if (!confirm("Log out?")) {
								return;
							}
							API.authLogout();
							setUser(null);
						}}
					>Log out</button>
				</div>

			</div>
			<div id="main">
				<h2>Dogs</h2>
				<div className="dog-list-wrapper">
					<div className="dog-list-container">
						{dogs 
							? dogs.map((dog, i) => 
									<DogPreview 
										showFavs={showFavs}
										favDogs={favDogs}
										key={i} dog={dog}/>
								)
							: <div>Loading dogs...</div>
						}
					</div>
					<DogButtons/>
				</div>
			</div>
			<div id="aside">
				<h2></h2>
				
				<div className="card dog-controls-wrapper">
					<div className="dog-controls-display">
						Showing page {currPage} of {pageCount}
					</div>
					<DogButtons/>
				</div>
				
				{match && (
					<div className="card match-dog-wrapper">
						<div className="match-dog-display">
							Latest Match
						</div>
						<MatchDogPreview setMatch={setMatch} dog={match}/>
					</div>
				)}
				
				{!!favs.length && (
					<div className="card fav-dog-list-wrapper">
						<h4>Loved</h4>
						<div className="fav-dog-list-container">
							{favs.map((dog, i) => 
								<FavDogPreview
									showFavs={showFavs}
									favDogs={favDogs}
									key={i} dog={dog}/>
								)}
						</div>
						<button
							onClick={async () => {
								try {
									const res = await API.dogsMatch(favs.map(({id}) => id));

									if (!res.ok) {
										throw res.error;
									}
									const dogsRes = await API.dogs([res.data.match]);
									if (!dogsRes.ok) {
										throw dogsRes.error;
									}
									setMatch(dogsRes.data[0])

								}
								catch(error) {
									alert(error)
								}
							}}
						>Find Match</button>
					</div>
				)}
				
				<div className="card">
					Around you
				</div>

			</div>
		</>
	)
}