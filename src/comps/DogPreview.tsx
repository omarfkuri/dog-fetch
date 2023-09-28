import React from "react";
import type { FavsSet, ShowFavsFn } from "../api";
import { useZipCode } from "../api/use/useZipCode";


export function DogPreview({dog, favDogs, showFavs, setViewDog}: {
	dog: Dog
	favDogs: FavsSet
	showFavs: ShowFavsFn
	setViewDog: (dg: null | Dog) => void
}) {
	
	const loc = useZipCode(dog.zip_code);
	
	return (
		<div className="card dog-pre-card">
			<div className="dog-pre-image-container" onClick={() => setViewDog(dog)}>
				<img src={dog.img} alt={dog.name} draggable={false}/>
				<div className="dog-pre-image-front">
					<div className="dog-pre-image-name">{dog.name}</div>
					<div className="dog-pre-image-age">{dog.age} year{dog.age === 1?"":"s"} old</div>
				</div>
			</div>
			<div className="dog-pre-info">
				<div className="dog-pre-info-intro">
					<div className="dog-pre-info-breed">{dog.breed}</div>
					{loc && (
						<div className="dog-pre-info-state">
							{loc.city}, {loc.state}
						</div>
					)}
				</div>
				<button
					onClick={() => setViewDog(dog)}
				>View</button>
				<button
					onClick={() => {
						if (favDogs.has(dog.id)) {
							favDogs.remFav(dog.id, showFavs);
						}
						else {
							favDogs.addFav(dog.id, showFavs);
						}
					}}
				>{favDogs.has(dog.id)? "Unfavorite": "Favorite"}</button>
			</div>
		</div>
	)
}