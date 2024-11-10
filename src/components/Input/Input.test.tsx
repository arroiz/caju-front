import { Input } from '.';
import { cleanup, render, screen } from '@testing-library/react';

describe('Input', () => {
  it('should show Input with label', () => {
    render(<Input label="input teste" placeholder="placeholder teste" />);
    expect(screen.getByText(/input teste/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/placeholder teste/i)).toBeInTheDocument();
  });

  it('should show Input error message only when the button has aria-invalid="true"', () => {
    render(<Input errorMessage="invalid field" isInvalid={false} />);
    expect(screen.getByText(/invalid field/i)).not.toBeVisible();
    cleanup();
    render(<Input errorMessage="invalid field" isInvalid={true} />);
    expect(screen.getByText(/invalid field/i)).toBeVisible();
  });
});
