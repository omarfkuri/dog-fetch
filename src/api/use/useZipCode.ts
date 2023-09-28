import { useEffect, useState } from "react";
import { API } from "../API";



export function useZipCode(...zips: string[]) {
	const [loc, setLoc] = useState<Location | null>(null);

	useEffect(() => {

		API.locations(zips)
		.then(([res]) => setLoc(res))

	}, [])

	return loc;
}