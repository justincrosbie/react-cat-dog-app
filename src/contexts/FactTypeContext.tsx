import React, { createContext, useState, useContext, ReactNode } from 'react';
import { FactType } from '../interfaces/Fact';

interface FactTypeContextType {
  selectedType: FactType;
  setSelectedType: (type: FactType) => void;
}

const FactTypeContext = createContext<FactTypeContextType | undefined>(undefined);

export const FactTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedType, setSelectedType] = useState<FactType>('both');

  return (
    <FactTypeContext.Provider value={{ selectedType, setSelectedType }}>
      {children}
    </FactTypeContext.Provider>
  );
};

export const useFactType = () => {
  const context = useContext(FactTypeContext);
  if (context === undefined) {
    throw new Error('useFactType must be used within a FactTypeProvider');
  }
  return context;
};