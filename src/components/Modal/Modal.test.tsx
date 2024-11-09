import { Modal } from '.';
import { render, screen } from '@testing-library/react';

beforeAll(() => {
  HTMLDialogElement.prototype.show = jest.fn(function () {
    this.open = true;
  });
  HTMLDialogElement.prototype.showModal = jest.fn(function () {
    this.open = true;
  });
  HTMLDialogElement.prototype.close = jest.fn(function () {
    if (this.onclose) {
      this.onClose();
    }
    this.open = false;
  });
});

describe('Modal', () => {
  it('should show Modal when the property isOpen is true', () => {
    const onCloseModalMock = jest.fn();
    render(
      <Modal isOpen onClose={onCloseModalMock} aria-label="example">
        <span>Modal</span>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should not show Modal when the property isOpen is false', () => {
    const onCloseModalMock = jest.fn();
    render(
      <Modal isOpen={false} onClose={onCloseModalMock} aria-label="example">
        <span>Modal</span>
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
