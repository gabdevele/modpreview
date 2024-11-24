import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ServerItemProps } from '../types/ServerItemProps';

interface SelectedServerContextProps {
  selectedServer: ServerItemProps | null;
  setSelectedServer: (server: ServerItemProps | null) => void;
}

const SelectedServerContext = createContext<SelectedServerContextProps | undefined>(undefined);

export const SelectedServerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedServer, setSelectedServer] = useState<ServerItemProps | null>(null);

  return (
    <SelectedServerContext.Provider value={{ selectedServer, setSelectedServer }}>
      {children}
    </SelectedServerContext.Provider>
  );
};

export const useSelectedServer = () => {
  const context = useContext(SelectedServerContext);
  if (!context) {
    throw new Error('useSelectedServer must be used within a SelectedServerProvider');
  }
  return context;
};