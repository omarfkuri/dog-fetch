import React from "react";
import type { FavsSet, ShowFavsFn } from "../api";


export function FavDogPreview({dog, favDogs, showFavs}: {dog: Dog, favDogs: FavsSet, showFavs: ShowFavsFn}) {
	
	return (
		<div className="card fav-dog-card">
			<div className="fav-dog-image-container">
				<img src={dog.img} alt={dog.name} draggable={false}/>
			</div>
			<div className="fav-dog-intro">
				<div className="fav-dog-name">{dog.name}</div>
			</div>
			<div className="fav-dog-tools">
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