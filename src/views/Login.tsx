import React, { useState } from "react";
import { API } from "../api";


export default function Login ({setUser}: {setUser(user: User|null): void}) {

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	return (
		<>
			<div>
				<h2>Log In</h2>
			</div>

			<form id="login-form" className="card" onSubmit={async e => {
				e.preventDefault();

				try {
					await API.authLogin(name, email);
					setUser({name, email});
				}
				catch(err) {
					alert(err)
				}

			}}>
				
				<label>
					<div>Name</div>
					<input 
						value={name}
						onChange={e => setName(e.target.value)}
						type="text" 
						required/>
				</label>

				<label>
					<div>Email</div>
					<input 
						value={email}
						onChange={e => setEmail(e.target.value)}
						type="email" 
						required/>
				</label>

				<button>Submit</button>

			</form>
			

		</>
	)
}