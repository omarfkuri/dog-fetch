

import ReactDOM from 'react-dom/client';

type Close = () => void

export async function showModal(elem: (close: Close) => JSX.Element) {

	const overlay = ReactDOM.createRoot(
	  document.getElementById('overlay') as HTMLElement
	);

	return new Promise<void>(res => {

		const close = () => {
			overlay.unmount();
			res();
		}

		document.getElementById('overlay')!.onclick = (e) => {
			if ((e.target as HTMLElement).id === "overlay") {
				close();
			}
		}

		overlay.render(elem(close));

	})

}

