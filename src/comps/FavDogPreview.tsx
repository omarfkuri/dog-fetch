import React from "react";
import type { FavsSet, ShowFavsFn } from "../api";


export function FavDogPreview({dog, favDogs, showFavs, setViewDog}: {
	dog: Dog
	favDogs: FavsSet
	showFavs: ShowFavsFn
	setViewDog: (dg: null | Dog) => void
}) {
	
	return (
		<div className="card fav-card">
			<div className="fav-image-container">
				<img src={dog.img} alt={dog.name} draggable={false}/>
			</div>
			<div className="fav-name">{dog.name}</div>
			<div className="fav-tools">
				<button
					onClick={() => setViewDog(dog)}
				>View</button>
				<button
					onClick={() => {
						if (confirm(`Remove ${dog.name}?`)) {
							favDogs.remFav(dog.id, showFavs)
						}
					}}
				>Remove</button>
			</div>
		</div>
	)
}