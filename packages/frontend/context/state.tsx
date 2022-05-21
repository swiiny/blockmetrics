import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext({});

export function AppWrapper({ reducer, initialState = {}, children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('unable to find AppContext');
  }

  return context;
}
