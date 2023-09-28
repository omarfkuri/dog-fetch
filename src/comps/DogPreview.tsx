import React from "react";
import type { FavsSet, ShowFavsFn } from "../api";


export function DogPreview({dog, favDogs, showFavs}: {dog: Dog, favDogs: FavsSet, showFavs: ShowFavsFn}) {
	
	return (
		<div className="card dog-card">
			<div className="dog-image-container">
				<img src={dog.img} alt={dog.name} draggable={false}/>
			</div>
			<div className="dog-intro">
				<div className="dog-name">{dog.name}</div>
				<div className="dog-age">{dog.age} years old</div>
			</div>
			<div className="dog-info">
				<div className="dog-breed">{dog.breed}</div>
				<div className="dog-zip">{dog.zip_code}</div>
				<button
					onClick={() => {
						if (favDogs.has(dog.id)) {
							favDogs.remFav(dog.id, showFavs);
						}
						else {
							favDogs.addFav(dog.id, showFavs);
						}
					}}
				>{favDogs.has(dog.id)? "Dislike": "Like"}</button>
			</div>
		</div>
	)
}