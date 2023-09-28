
import { api } from "./api";
import { reload } from "./funcs/reload";
reload(500)

// import React from "react"
// import ReactDOM from 'react-dom/client';
// import App from "./App";

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );



void async function() {

  try {
    const login = await api.authLogin("Omar", "omarfkuri@gmail.com");
    if (!login.ok) {
      throw login.error;
    }

    const breeds = await api.dogsBreeds();
    if (!breeds.ok) {
      throw breeds.error;
    }

    const dogs = await api.dogsSearch({breeds: ["Airedale"]});
    if (!dogs.ok) {
      throw dogs.error;
    }

    console.log(dogs.data)
  }
  catch(err) {
    alert(err)
  }


}()

