import { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './styles';
import { Button } from '../Button';

export const CONFIRMATION_DIALOG_DEFAULT_OPTIONS = {
  title: 'Atualizar Informações',
  description: 'Confirma alteração nos dados?',
  cancelButtonLabel: 'Cancelar',
  confirmButtonLabel: 'Confirmar',
};

export type ConfirmationDialogProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
  options?: {
    title?: string;
    description?: string;
    cancelButtonLabel?: string;
    confirmButtonLabel?: string;
  };
};

export const ConfirmationDialog = ({
  isOpen,
  onCancel,
  onConfirm,
  options = CONFIRMATION_DIALOG_DEFAULT_OPTIONS,
}: ConfirmationDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return isOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [isOpen]);

  const handleConfirm = useCallback(async () => {
    try {
      setIsLoading(true);
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  }, [onConfirm]);

  return (
    <S.Dialog ref={dialogRef} onClose={onCancel}>
      <S.DialogContent>
        <S.DialogTitle>{options.title}</S.DialogTitle>
        <S.DialogDescription>{options.description}</S.DialogDescription>
      </S.DialogContent>
      <S.DialogFooter>
        <Button onClick={onCancel} disabled={isLoading}>
          {options.cancelButtonLabel}
        </Button>
        <Button onClick={handleConfirm} disabled={isLoading}>
          {options.confirmButtonLabel}
        </Button>
      </S.DialogFooter>
    </S.Dialog>
  );
};
