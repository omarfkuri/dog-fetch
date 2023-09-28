import React, { useState } from "react";
import { api } from "../api";


export default function Login ({setUser}: {setUser(user: User|null): void}) {

	const [name, setName] = useState("Omar");
	const [email, setEmail] = useState("omarfkuri@gmail.com");

	return (
		<>
			<div>
				<h2>Log In</h2>
			</div>

			<form id="login-form" className="card" onSubmit={async e => {
				e.preventDefault();

				try {
					await api.authLogin(name, email);
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