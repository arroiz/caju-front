import { Button } from '.';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button', () => {
  it('should show button', () => {
    render(<Button>Ativar</Button>);
    expect(screen.getByRole('button', { name: /ativar/i })).toBeInTheDocument();
  });

  it('should call onClick when the button is clicked', () => {
    const clickMock = jest.fn();
    render(<Button onClick={clickMock}>Ativar</Button>);
    fireEvent.click(screen.getByRole('button', { name: /ativar/i }));
    expect(clickMock).toHaveBeenCalledTimes(1);
  });

  it('should be focusable', () => {
    render(<Button>Ativar</Button>);
    const button = screen.getByRole('button', { name: /ativar/i });
    button.focus();
    expect(button).toHaveFocus();
  });
});
