import React from "react";


export function DogPreview({dog}: {dog: Dog}) {
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
				<button>Buy</button>
			</div>
		</div>
	)
}