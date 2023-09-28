import React, { useEffect, useState } from "react";
import Dogs from "./views/Dogs";
import Login from "./views/Login";
import { api } from "./api";



export default function App () {

	const [user, setUser] = useState<User | null>(null);

	const defUser: User = {
		name: "Omar",
		email: "omarfkuri@gmail.com"
	}

	useEffect(() => {
		api.authLogin(defUser)
		.then(res => {
			if (res.ok) {
				setUser(defUser)
			}
			else {
				throw res.error
			}
		})
		.catch(alert);

	}, []);

	return (
		user
		? <Dogs user={user} setUser={setUser}/>
		: <Login setUser={setUser}/>
	)
}


