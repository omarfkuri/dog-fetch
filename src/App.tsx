import React, { useEffect, useState } from "react";
import Dogs from "./views/Dogs";
import Login from "./views/Login";
import { API } from "./api";



export default function App () {

	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		API.authLogin({name: "Omar", email: "em@ail.com"})
		.then(() => setUser({name: "Omar", email: "em@ail.com"}))
		.catch(alert)
	}, [])

	return (
		user
		? <Dogs user={user} setUser={setUser}/>
		: <Login setUser={setUser}/>
	)
}


