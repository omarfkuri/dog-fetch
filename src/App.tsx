import React, { useState } from "react";
import Dogs from "./views/Dogs";
import Login from "./views/Login";



export default function App () {

	const [user, setUser] = useState<User | null>(null);

	return (
		user
		? <Dogs user={user} setUser={setUser}/>
		: <Login setUser={setUser}/>
	)
}


