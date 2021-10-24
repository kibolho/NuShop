import React, {createContext, ReactNode, useState} from 'react';
import {IModal} from '@app/components/Modal/ModalManager';

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextData {
  lastModal?: IModal;
  pushModal: (modal: IModal) => void;
  popModal(): void;
}

export const ModalContext = createContext<ModalContextData>(
  {} as ModalContextData,
);

export function ModalProvider({children}: ModalProviderProps) {
  const [modals, setModals] = useState<IModal[]>([]);

  const pushModal = (modal: IModal) => {
    setModals(prev => [...prev, modal]);
  };

  const popModal = () => {
    setModals(prev => {
      const newModels = [...prev];
      newModels.pop();
      return newModels;
    });
  };

  const lastModal = modals.length <= 0 ? undefined : modals[modals.length - 1];
  return (
    <ModalContext.Provider
      value={{
        lastModal,
        pushModal,
        popModal,
      }}>
      {children}
    </ModalContext.Provider>
  );
}
