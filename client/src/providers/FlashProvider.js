import React, { useState, } from "react";

export const FlashContext = React.createContext();
export const FlashConsumer = FlashContext.Consumer;

export const FlashProvider = (props) => {
  const [flash, setFlash] = useState({});

  const setFlashMessage = (message, color) => {
    setFlash({ message, color, });
  }

  const fadeFlash = () => {
    setTimeout( () => {
      setFlash({});
    }, 3000);
  };

  return (
    <FlashContext.Provider value={{
      flash,
      fadeFlash,
      setFlashMessage,
      setFlash: () => setFlash({}),
    }}>
      { props.children }
    </FlashContext.Provider>
  )

}
