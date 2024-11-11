import { render, screen } from '@testing-library/react';
import { SearchBar } from '.';
import { ConfirmationDialogWrapper } from '~/helpers/testHelpers';
import userEvent from '@testing-library/user-event';
import { routes } from '~/router/routes';

describe('SearchBar', () => {
  it('should render SearchBar with CPF input, refetch button and New Job Application link', () => {
    const onRefetchMock = jest.fn();
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} onRefetch={onRefetchMock} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    expect(screen.getByPlaceholderText(/digite um cpf válido/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refetch/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /nova admissão/i })).toBeInTheDocument();
  });

  it('should call onRefetch when refetch button is clicked', async () => {
    const user = userEvent.setup();
    const onRefetchMock = jest.fn();
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} onRefetch={onRefetchMock} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    await user.click(screen.getByRole('button', { name: /refetch/i }));
    expect(onRefetchMock).toHaveBeenCalledTimes(1);
  });
  it('should call onSearch when a valid CPF is entered', async () => {
    const user = userEvent.setup();
    const onRefetchMock = jest.fn();
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} onRefetch={onRefetchMock} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    const cpfInput = screen.getByPlaceholderText(/digite um cpf válido/i);
    await user.click(cpfInput);
    await user.keyboard('17105291052');
    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });

  it('should navigate to New Job Application page when the New Job Application link is clicked', async () => {
    const user = userEvent.setup();
    const onRefetchMock = jest.fn();
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} onRefetch={onRefetchMock} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    const newJobApplicationLink = screen.getByRole('link', { name: /nova admissão/i });
    await user.click(newJobApplicationLink);
    expect(window.location.pathname).toBe(routes.newJobApplication);
  });
});
