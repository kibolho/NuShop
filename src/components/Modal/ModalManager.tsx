import React from 'react';
import {useModal} from '../../providers/hooks/useModal';
import {
  ModalTitleDescription,
  ModalTitleDescriptionProps,
} from '@app/components/Modal/TitleDescription';

export enum ModalTypes {
  TitleDescription = 'modal/TitleDescription',
}

export type ModalProps = ModalTitleDescriptionProps | undefined;

export interface IModal {
  modalType: ModalTypes;
  modalProps: ModalProps;
}

export function ModalManager() {
  const {lastModal} = useModal();
  switch (lastModal?.modalType) {
    case ModalTypes.TitleDescription:
      return (
        <ModalTitleDescription
          {...(lastModal.modalProps as ModalTitleDescriptionProps)}
        />
      );
    default:
  }
  return null;
}
