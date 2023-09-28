import React from "react";
import { type FavsSet, type ShowFavsFn } from "../api";
import { useZipCode } from "../api/use/useZipCode";



export function DogView({dog, favDogs, showFavs}: {
	dog: Dog
	favDogs: FavsSet
	showFavs: ShowFavsFn
}) {

	const loc = useZipCode(dog.zip_code);
	
	return (
		<>
			<div className="card dog-view-card">

				<div className="dog-view-image-container">
					<img src={dog.img} alt={dog.name} draggable={false}/>
				</div>
				<div className="dog-view-intro">
					<div className="dog-view-age">{dog.age} years old</div>
				</div>
				<div className="dog-view-info">
					<div className="dog-view-breed">{dog.breed}</div>
					{loc && (
						<div className="dog-view-zip">
							{loc.city}, {loc.state}
						</div>
					)}
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
		</>
	)
}