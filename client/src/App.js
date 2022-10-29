import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {Context, storeContext} from "./utils/context";
import React, {useEffect} from 'react';
import {useTelegram} from "./hooks/useTelegram";
import './styles/fonts.css'
import './App.css'

function App() {

    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

  return (
      <Context.Provider value={storeContext}>
          <RouterProvider router={router} />
      </Context.Provider>
  );
}

export default App;
