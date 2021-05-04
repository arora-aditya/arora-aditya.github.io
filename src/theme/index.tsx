import { createContext, Dispatch, SetStateAction } from 'react';

const ThemeSetStore = createContext<Dispatch<SetStateAction<string>>>(() => {});

export default ThemeSetStore;