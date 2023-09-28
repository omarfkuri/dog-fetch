import React from "react";


export function MatchDogPreview({dog, setMatch, setViewDog}: {
	dog: Dog
	setMatch: (m: Dog | null) => void
	setViewDog: (dg: null | Dog) => void
}) {
	
	return (
		<div className="card match-card">
			<div className="match-image-container">
				<img src={dog.img} alt={dog.name} draggable={false}/>
			</div>
			<div className="match-name">{dog.name}</div>
			<div className="match-tools">
				<button
					onClick={() => setViewDog(dog)}
				>View</button>
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