import {useContext} from 'react';
import {ModalContext} from '../ModalProvider';

export function useModal() {
  const context = useContext(ModalContext);
  return context;
}
