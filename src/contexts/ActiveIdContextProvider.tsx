import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useActiveId } from '../lib/hooks';

type TActiveIdContext = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<TActiveIdContext | null>(null);

type ActiveIdContextProviderProps = {
  children: ReactNode;
};

// 為了避免每使用一次 useActiveId 就 addEventListener，所以共用同個 state
function ActiveIdContextProvider({ children }: ActiveIdContextProviderProps) {
  const activeId = useActiveId();
  const value = { activeId };

  return (
    <ActiveIdContext.Provider value={value}>
      {children}
    </ActiveIdContext.Provider>
  );
}

export default ActiveIdContextProvider;
