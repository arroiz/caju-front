import { Header, HeaderTitle } from '.';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  it('should show Header', () => {
    render(<Header>Header</Header>);
    expect(screen.getByText(/header/i)).toBeInTheDocument();
  });

  it('should show HeaderTitle as role heading', () => {
    render(
      <Header>
        <HeaderTitle>Title</HeaderTitle>
      </Header>,
    );
    expect(screen.getByRole('heading', { name: /title/i })).toBeInTheDocument();
  });
});
