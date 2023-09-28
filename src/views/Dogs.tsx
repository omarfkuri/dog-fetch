import React, { useEffect, useState } from "react";
import { DogPreview } from "../comps/DogPreview";
import { API, FavsSet } from "../api";
import { CheckBox } from "../comps/CheckBox";
import { Label } from "../comps/Label";
import { BreedSet } from "../api/";
import { FavDogPreview } from "../comps/FavDogPreview";
import { MatchDogPreview } from "../comps/MatchDogPreview";
import { DogView } from "../comps/DogView";
import { showModal } from "../funcs/modal";

const filterBreeds = new BreedSet;
const favDogs = new FavsSet;
const format = new Intl.NumberFormat("en", {notation: "compact"});

export default function Dogs({user, setUser}: {user: User, setUser(user: User|null): void}) {

	const [dogs, setDogs] = useState<Dog[] | null>(null);
	const [match, setMatch] = useState<Dog | null>(null);
	const [viewDog, setViewDog] = useState<Dog | null>(null);
	const [favs, setFavs] = useState<Dog[]>([]);
	const [breeds, setBreeds] = useState<Breed[] | null>(null);
	const [sort, setSort] = useState<Sort>("breed:asc");
	const [prevPage, setPrevPage] = useState<string | null>(null);
	const [nextPage, setNextPage] = useState<string | null>(null);
	const [currPage, setCurrPage] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [total, setTotal] = useState("0");

	async function showPage(type: "next" | "prev", pageQuery: string) {
		const res = await API.query(pageQuery);	
		setCurrPage(currPage + (type === "next" ? 1 : -1))
		await showDogs(res);
	}

	function setCount(result: SearchResult) {
		const count = (
			Math.floor(result.total / result.resultIds.length)
		);
		setPageCount(count + 2);

	}

	async function showDogs(result: SearchResult, reset = false) {
		const dogs = await gatherDogs(result, reset);
		if (reset) {
			setCurrPage(1);
			setCount(result)
		}
		setDogs(dogs);
		window.scrollTo({top: 0})

	}

	async function showFavs(result: Dog[], reset = false) {
		setFavs(result);
	}

	async function gatherDogs(result: SearchResult, reset: boolean): Promise<Dog[]> {
		const dogArr = await API.dogs(result.resultIds);
		setTotal(format.format(result.total))
		setPrevPage(result.prev || null)
		setNextPage(result.next || null)

		return dogArr;
	}

	useEffect(() => {
		
		API.dogsBreeds()
		.then(res => {
			setBreeds(res);
			return API.dogsSearch({sort});
		})
		.then(res => {
			setCurrPage(1);
			setCount(res)
			return gatherDogs(res, true);
		})
		.then(setDogs)
		.catch(alert);

	}, [])

	return (
		<>
			<div id="main">
				<div className="dog-list-title">{
					viewDog 
					? viewDog.name
					: dogs
						? `${total} Dogs`
						: "Fetching..."
				}</div>
				{viewDog 
					? (
						<div className="dog-main dog-view-wrapper">
							<DogView dog={viewDog} 
								favDogs={favDogs} showFavs={showFavs}/>
						</div>
					)
					: (
						<div className="dog-main dog-list-wrapper">
							<div className="dog-list-container">
								{dogs 
									? dogs.map((dog, i) => 
											<DogPreview 
												setViewDog={setViewDog}
												showFavs={showFavs}
												favDogs={favDogs}
												key={i} dog={dog}/>
										)
									: <div>Loading dogs...</div>
								}
							</div>
							<div className="dog-list-control-wrapper">
								<div className="dog-list-control-button dog-list-control-button-prev">
									{prevPage && <button 
										onClick={() => showPage("prev", prevPage)}>
										Back
									</button>}
								</div>
								<div className="dog-list-control-button dog-list-control-button-next">
									{nextPage && <button 
										onClick={() => showPage("next", nextPage)}>
										Next
									</button>}
								</div>
							</div>
						</div>
					)
				}
			</div>
			<div id="tools">
				<div id="sidebar">
					
					<div className="logo-wrapper">
						<div className="logo-container"></div>
					</div>
					
					{viewDog 
						? <button className="ret-btn" onClick={() => setViewDog(null)}>Return</button>
						: <>
								{!!currPage && (
									<div className="card list-info-wrapper">
										<div className="list-info-display">
											Page {currPage} of {pageCount}
										</div>
										<div className="list-info-control-wrapper">
											<div className="list-info-control-button list-info-control-button-prev">
												{prevPage && (
													<button onClick={() => showPage("prev", prevPage)}>Back</button>
												)}
											</div>
											<div className="list-info-control-button list-info-control-button-next">
												{nextPage && (
													<button onClick={() => showPage("next", nextPage)}>Next</button>
												)}
											</div>
										</div>
									</div>
								)}

								<div className="card filter-wrapper">
									<div className="filter-title">Filter Breeds</div>	
									<div className="filter-sort-container">
										<select
											onChange={(e) => {
												const {value} = e.target.selectedOptions[0];

												let sort: Sort

												if (value === "Z-A") {
													sort = "breed:desc"
												}
												else {
													sort = "breed:asc"
												}

												setSort(sort);
												filterBreeds.sortBy(sort, showDogs);

											}}
										>
											<option defaultValue="breed:asc">A-Z</option>
											<option defaultValue="breed:desc">Z-A</option>
										</select>
									</div>
									<div className="filter-list-container">
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
						</>
					}
				</div>
				<div id="aside">
					
					<div className="aside-top"></div>
					
					{match && (
						<div className="card match-wrapper">
							<div className="match-display">
								Latest Match
							</div>
							<MatchDogPreview 
								setViewDog={setViewDog} 
								setMatch={setMatch} dog={match}/>
						</div>
					)}
					
					{!!favs.length && (
						<div className="card fav-list-wrapper">
							<div className="fav-list-title">Favorites</div>	
							<div className="fav-list-container">
								{favs.map((dog, i) => 
									<FavDogPreview
										setViewDog={setViewDog}
										showFavs={showFavs}
										favDogs={favDogs}
										key={i} dog={dog}/>
									)}
							</div>
							<button
								onClick={async () => {
									try {
										const res = await API.dogsMatch(favs.map(({id}) => id));
										const [dogRes] = await API.dogs([res.match]);
										setMatch(dogRes);
										await showModal(close => (
											<div className="card modal-wrapper">
												<div className="modal-title">Match found</div>
												<div className="modal-content-wrapper">
													<div className="modal-content-image">
														<img src={dogRes.img} alt={dogRes.name}/>
													</div>
													<div className="modal-content-name">{dogRes.name}</div>
												</div>
												<div className="modal-tools">
													<button onClick={close}>Ok</button>
												</div>
											</div>
										))
									}
									catch(error) {
										alert(error)
									}
								}}
							>Find Match</button>
						</div>
					)}

					<div className="card account-wrapper">
						<div className="account-title">Account Info</div>
						<div className="account-info-wrapper">
							<div className="account-info-name">{user.name}</div>
							<div className="account-info-email">{user.email}</div>
						</div>
						<div className="account-actions-container">
							<button
								onClick={async () => {
									if (!confirm("Log out?")) {
										return;
									}
									await API.authLogout();
									setUser(null);
								}}
							>Log out</button>
						</div>
						
					</div>
				</div>
			</div>
		</>
	)
}