import { Loading } from '.';
import { render, screen } from '@testing-library/react';

describe('Loading', () => {
  it('should show Loading component with Loading label', () => {
    render(<Loading />);
    expect(screen.getByLabelText('carregando')).toBeInTheDocument();
  });
});
