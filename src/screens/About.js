import React, { createContext, useState } from "react";
export const StoreContext = createContext(null);
export default ({ children }) => {
  const [newChapters, setNewChapters] = useState(false);

  const store = {
    newChapters,
    setNewChapters,
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
