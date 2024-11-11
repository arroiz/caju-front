import userEvent from '@testing-library/user-event';
import { ConfirmationDialog } from '.';
import { render, screen } from '@testing-library/react';

describe('ConfirmationDialog', () => {
  it('should show Dialog when the property isOpen is true', () => {
    const onCloseDialogMock = jest.fn();
    const onConfirmDialogMock = jest.fn();
    render(
      <ConfirmationDialog isOpen onCancel={onCloseDialogMock} onConfirm={onConfirmDialogMock} />,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /atualizar informações/i })).toBeInTheDocument();
    expect(screen.getByText(/confirma alteração nos dados\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });

  it('should not show Modal when the property isOpen is false', () => {
    const onCloseDialogMock = jest.fn();
    const onConfirmDialogMock = jest.fn();
    render(
      <ConfirmationDialog
        isOpen={false}
        onCancel={onCloseDialogMock}
        onConfirm={onConfirmDialogMock}
      />,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should call onConfirm when the confirm button is clicked', async () => {
    const user = userEvent.setup();
    const onCloseDialogMock = jest.fn();
    const onConfirmDialogMock = jest.fn();
    render(
      <ConfirmationDialog isOpen onCancel={onCloseDialogMock} onConfirm={onConfirmDialogMock} />,
    );
    const confirmButton = screen.getByRole('button', { name: /confirmar/i });
    await user.click(confirmButton);
    expect(onConfirmDialogMock).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when the cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onCloseDialogMock = jest.fn();
    const onConfirmDialogMock = jest.fn();
    render(
      <ConfirmationDialog isOpen onCancel={onCloseDialogMock} onConfirm={onConfirmDialogMock} />,
    );
    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    await user.click(cancelButton);
    expect(onCloseDialogMock).toHaveBeenCalledTimes(1);
  });

  it('should be possible change the modal title, description and button labels', async () => {
    const onCloseDialogMock = jest.fn();
    const onConfirmDialogMock = jest.fn();
    const testInfo = {
      title: 'Dialog de teste',
      description: 'Voce quer testar?',
      cancelButtonLabel: 'Não',
      confirmButtonLabel: 'Sim',
    };
    render(
      <ConfirmationDialog
        isOpen
        onCancel={onCloseDialogMock}
        onConfirm={onConfirmDialogMock}
        options={testInfo}
      />,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: testInfo.title })).toBeInTheDocument();
    expect(screen.getByText(testInfo.description)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: testInfo.cancelButtonLabel })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: testInfo.confirmButtonLabel })).toBeInTheDocument();
  });
});
