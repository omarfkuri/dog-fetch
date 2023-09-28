import { sleep } from "./sleep";

export async function reload(time: number) {

	let latest = {
		css: 0,
		ui: 0
	};

	while (true) {

		try {
			const res = await fetch("/reload");
			const body: {latest: {css: number, ui: number}} = await res.json();
			if (body.latest.ui > latest.ui && latest.ui !== 0) {
				location.reload();
			}
			if (body.latest.css > latest.css && latest.css !== 0) {
				[...document.querySelectorAll("link")].forEach(link => {
					const clone = link.cloneNode(true);
					link.replaceWith(clone);
				})
			}
			latest.css = body.latest.css
			latest.ui = body.latest.ui
		}
		catch(err) {
			if (!confirm("Could not connect to server. Try again?")) {
				break;
			}
		}
		
		await sleep(time);
	}

}