import React, { useContext } from 'react';
import { FpeApiInterface } from './typeDef';
import fpeConfig from 'test-fpe';

const FpeContext:React.Context<FpeApiInterface> = React.createContext(fpeConfig);
//TODO:hari update any type
export const useFpe = (selector:(fpe: FpeApiInterface) => any) => {
  const fpe = useContext(FpeContext)
  return selector(fpe)
}
