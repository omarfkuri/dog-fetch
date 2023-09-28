import React, { useEffect, useState } from "react";
import { DogPreview } from "../comps/DogPreview";
import { CheckBox } from "../comps/CheckBox";
import { Label } from "../comps/Label";
import { api } from "../api";

let first = false;

export default function Dogs({user, setUser}: {user: User, setUser(user: User|null): void}) {

	const [dogs, setDogs] = useState<Dog[] | null>(null);
	const [breeds, setBreeds] = useState<Breed[]>([]);

	useEffect(() => {
		(async () => {
			if (!first) {
				try {
					const res = await api.dogsBreeds()
					if (!res.ok) {
						throw res.error
					}
					first = true;
					setBreeds(res.data);

				}
				catch(err) {
					alert(err)
				}
			}
			else {

				try {
					const ids = await api.dogsSearch({breeds});
					if (!ids.ok) {
						throw ids.error
					}
					
					const dogs = await api.dogs(ids.data.resultIds);
					if (!dogs.ok) {
						throw dogs.error
					}

					setDogs(dogs.data);

				}
				catch(err) {
					alert(err)
				}
			}

		})()

	}, [])

	return (
		<>
			<div id="sidebar">
				
				<div id="logo-container"></div>

				<div className="card">
					<h4>Filter Breeds</h4>	
					<div>
						<Label display="Afghan">
							<CheckBox 
								onChange={e => {
									if (!e.target.checked) {
										setBreeds(breeds.filter(breed => breed !== "Afghan"));
									}
									else {
										setBreeds([...breeds, "Afghan"]);
									}
								}}
								value="Afghan" 
								startChecked
								name="dog-filter"
							/>
						</Label>
						<Label display="Rottweiler">
							<CheckBox 
								onChange={e => {
									if (!e.target.checked) {
										setBreeds(breeds.filter(breed => breed !== "Rottweiler"));
									}
									else {
										setBreeds([...breeds, "Rottweiler"]);
									}
								}}
								value="Rotweiler" 
								startChecked
								name="dog-filter"
							/>
						</Label>
						<Label display="Chihuahua">
							<CheckBox 
								onChange={e => {
									if (!e.target.checked) {
										setBreeds(breeds.filter(breed => breed !== "Chihuahua"));
									}
									else {
										setBreeds([...breeds, "Chihuahua"]);
									}
								}}
								value="Chihuahua" 
								startChecked
								name="dog-filter"
							/>
						</Label>
						<Label display="Labrador">
							<CheckBox 
								onChange={e => {
									if (!e.target.checked) {
										setBreeds(breeds.filter(breed => breed !== "Labrador"));
									}
									else {
										setBreeds([...breeds, "Labrador"]);
									}
								}}
								value="Labrador" 
								startChecked
								name="dog-filter"
							/>
						</Label>
						<Label display="Dachshund">
							<CheckBox 
								startChecked
								onChange={e => {
									if (!e.target.checked) {
										setBreeds(breeds.filter(breed => breed !== "Dachshund"));
									}
									else {
										setBreeds([...breeds, "Dachshund"]);
									}
								}}
								value="Daschund" 
								name="dog-filter"
							/>
						</Label>
					</div>
				</div>

				<div>
					<h5>{user.name}</h5>
					<button
						onClick={e => {
							if (!confirm("Log out?")) {
								return;
							}
							api.authLogout();
							setUser(null);
						}}
					>Log out</button>
				</div>

			</div>
			<div id="main">
				<h2>Dogs</h2>
				<div className="dog-list">
					{dogs 
						? dogs.map((dog, i) => <DogPreview key={i} dog={dog}/>)
						: <div>Loading dogs...</div>
					}
				</div>

			</div>
			<div id="aside">
				<h2></h2>
				
				<div className="card">
					Around you
				</div>

			</div>
		</>
	)
}