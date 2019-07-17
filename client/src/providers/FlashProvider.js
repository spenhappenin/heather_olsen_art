import React, { useState, } from "react";

export const FlashContext = React.createContext();
export const FlashConsumer = FlashContext.Consumer;

export const FlashProvider = ({ children, }) => {
  const [flash, setFlashMessage] = useState({});

  const setFlash = (message, color) => {
    setFlash({ message, color, });
  };

  const fadeFlash = () => {
    setTimeout( () => {
      setFlashMessage({});
    }, 3000);
  };

  return (
    <FlashContext.Provider value={{
      flash,
      fadeFlash,
      setFlash,
      setFlashMessage: () => setFlashMessage({}),
    }}>
      { children }
    </FlashContext.Provider>
  );
};
