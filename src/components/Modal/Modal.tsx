import { PropsWithChildren, useEffect, useRef } from 'react';
import * as S from './styles';

export type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    return isOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [isOpen]);

  return (
    <S.Modal ref={dialogRef} onClose={onClose}>
      {children}
    </S.Modal>
  );
};
