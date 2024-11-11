import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import {
  CONFIRMATION_DIALOG_DEFAULT_OPTIONS,
  ConfirmationDialog,
  ConfirmationDialogProps,
} from '~/components/ConfirmationDialog';

type ConfirmationDialogState = Partial<ConfirmationDialogProps>;

const INITIAL_STATE: ConfirmationDialogState = {
  isOpen: false,
  options: CONFIRMATION_DIALOG_DEFAULT_OPTIONS,
};

type dispatchConfirmationParams = Partial<ConfirmationDialogProps>;

type ConfirmationDialogContextValues = {
  dispatchConfirmation: (params: dispatchConfirmationParams) => void;
};

const ConfirmationDialogContext = createContext<ConfirmationDialogContextValues | null>(null);

type ConfirmationDialogProviderProps = PropsWithChildren<{}>;

export const ConfirmationDialogProvider = ({ children }: ConfirmationDialogProviderProps) => {
  const [state, setState] = useState(INITIAL_STATE);

  const handleCancel = useCallback(() => {
    state.onCancel?.();
    setState(INITIAL_STATE);
  }, [state]);

  const handleConfirm = useCallback(async () => {
    await state.onConfirm?.();
    setState(INITIAL_STATE);
  }, [state]);

  const dispatchConfirmation = useCallback(
    ({ onCancel, onConfirm, options }: dispatchConfirmationParams) => {
      setState({
        isOpen: true,
        onCancel,
        onConfirm,
        options: {
          ...CONFIRMATION_DIALOG_DEFAULT_OPTIONS,
          ...options,
        },
      });
    },
    [],
  );

  return (
    <ConfirmationDialogContext.Provider
      value={{
        dispatchConfirmation,
      }}
    >
      <ConfirmationDialog
        isOpen={Boolean(state.isOpen)}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        options={state.options}
      />
      {children}
    </ConfirmationDialogContext.Provider>
  );
};

export const useConfirmationDialog = () => {
  const context = useContext(ConfirmationDialogContext);

  if (!context) {
    throw new Error('useConfirmationDialog must be used within a ConfirmationDialogContext');
  }

  return context;
};
