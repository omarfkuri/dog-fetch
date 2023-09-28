import React from "react";


export function MatchDogPreview({dog, setMatch}: {dog: Dog, setMatch: (m: Dog | null) => void}) {
	
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
						if (confirm(`Unmatch from ${dog.name}?`)) {
							setMatch(null);
						}
					}}
				>Remove</button>
			</div>
		</div>
	)
}