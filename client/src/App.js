import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {Context, storeContext} from "./utils/context";
import React, {useEffect} from 'react';
import './styles/fonts.css'
import './App.css'
import {tgWebApp} from "./utils/telegramAPI";

function App() {

    if(tgWebApp.colorScheme === 'dark') {
        document.body.classList.remove("light")
        document.body.classList.add("dark")
    } else {
        document.body.classList.remove("dark")
        document.body.classList.add("light")
    }

    tgWebApp.onEvent('themeChanged', () => {
        if(tgWebApp.colorScheme === 'dark') {
            document.body.classList.remove("light")
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
            document.body.classList.add("light")
        }
    })

  return (
      <Context.Provider value={storeContext}>
          <RouterProvider router={router} />
      </Context.Provider>
  );
}

export default App;
