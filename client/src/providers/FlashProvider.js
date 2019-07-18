import React, { useState, } from "react";

export const FlashContext = React.createContext();
export const FlashConsumer = FlashContext.Consumer;

export const FlashProvider = ({ children, }) => {
  const [flash, setFlash] = useState({});

  const fadeFlash = () => {
    setTimeout( () => {
      setFlash({});
    }, 3000);
  };

  return (
    <FlashContext.Provider value={{
      flash,
      fadeFlash,
      setFlash: (message, color) => setFlash({ message, color }),
    }}>
      { children }
    </FlashContext.Provider>
  );
};
