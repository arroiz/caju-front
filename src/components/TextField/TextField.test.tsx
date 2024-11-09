import { TextField } from '.';
import { cleanup, render, screen } from '@testing-library/react';

describe('TextField', () => {
  it('should show TextField with label', () => {
    render(<TextField label="input teste" placeholder="placeholder teste" />);
    expect(screen.getByText(/input teste/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/placeholder teste/i)).toBeInTheDocument();
  });

  it('should show TextField error message only when the button has aria-invalid="true"', () => {
    render(<TextField errorMessage="invalid field" isInvalid={false} />);
    expect(screen.getByText(/invalid field/i)).not.toBeVisible();
    cleanup();
    render(<TextField errorMessage="invalid field" isInvalid={true} />);
    expect(screen.getByText(/invalid field/i)).toBeVisible();
  });
});
