import React, {createContext, useState} from 'react';

const SettingsContext = createContext([{}, () => {}]);

const SettingsProvider = props => {
  const [state, setState] = useState({
    searchUni: 'none',
    theme: 'white',
    chosedItem: 'none',
  });

  return (
    <SettingsContext.Provider value={[state, setState]}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export {SettingsContext, SettingsProvider};
