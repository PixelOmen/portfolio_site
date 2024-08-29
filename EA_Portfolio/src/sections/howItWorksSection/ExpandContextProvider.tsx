import React, { useState, createContext } from 'react'

interface IExpandContext {
  allExpanded?: { expand: boolean };
  setAllExpanded?: (expand: {expand: boolean} ) => void;
}

interface HIWContextProps {
  children: React.ReactNode
}

export const ExpandContext = createContext<IExpandContext>({});

export default function ExpandContextProvider( { children }: HIWContextProps ) {
  const [allExpanded, setAllExpanded] = useState({expand: false});
  return (
    <ExpandContext.Provider value={{allExpanded, setAllExpanded}}>
      {children}
    </ExpandContext.Provider>
  )
}
