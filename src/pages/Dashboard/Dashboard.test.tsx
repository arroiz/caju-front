import { DashboardPage } from '.';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { apiClient } from '~/config/apiClient';
import { ConfirmationDialogWrapper } from '~/helpers/testHelpers';

const defaultValue = [
  {
    applicationDate: '23/10/2023',
    email: 'luiz@caju.com.br',
    employeeName: 'Luiz Filho',
    status: 'APPROVED',
    cpf: '56642105087',
    id: '3',
  },
  {
    id: '1',
    applicationDate: '22/10/2023',
    email: 'filipe@caju.com.br',
    employeeName: 'Filipe Marins',
    status: 'REVIEW',
    cpf: '78502270001',
  },
  {
    id: '2',
    applicationDate: '25/10/2023',
    email: 'jose@caju.com.br',
    employeeName: 'José Leão',
    status: 'REPROVED',
    cpf: '78502270001',
  },
];

describe('DashboardPage', () => {
  it('should render SearchBar with CPF input, refetch button and New Job Application link', async () => {
    jest.spyOn(apiClient, 'get').mockReturnValue(
      Promise.resolve({
        data: defaultValue,
      }),
    );
    render(<DashboardPage />, {
      wrapper: ConfirmationDialogWrapper,
    });
    expect(screen.getByPlaceholderText(/digite um cpf válido/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /recarregar/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /nova admissão/i })).toBeInTheDocument();
  });

  it('should render Approve, Review and Reproved columns', async () => {
    jest.spyOn(apiClient, 'get').mockResolvedValue(
      Promise.resolve({
        data: defaultValue,
      }),
    );
    render(<DashboardPage />, {
      wrapper: ConfirmationDialogWrapper,
    });
    expect(
      await screen.findByRole('heading', { name: /pronto para revisar/i }),
    ).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /aprovado/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /reprovado/i })).toBeInTheDocument();
  });

  it('should render Name, Email and Job Application date from all fetched data ', async () => {
    jest.spyOn(apiClient, 'get').mockReturnValue(
      Promise.resolve({
        data: defaultValue,
      }),
    );
    render(<DashboardPage />, {
      wrapper: ConfirmationDialogWrapper,
    });
    const [person1, person2, person3] = defaultValue;
    expect(await screen.findByRole('heading', { name: person1.employeeName })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: person2.employeeName })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: person3.employeeName })).toBeInTheDocument();
    expect(await screen.findByText(person1.email)).toBeInTheDocument();
    expect(await screen.findByText(person2.email)).toBeInTheDocument();
    expect(await screen.findByText(person3.email)).toBeInTheDocument();
    expect(await screen.findByText(person1.applicationDate)).toBeInTheDocument();
    expect(await screen.findByText(person2.applicationDate)).toBeInTheDocument();
    expect(await screen.findByText(person3.applicationDate)).toBeInTheDocument();
  });

  it('show confirmation modal and success message when trying to delete job application', async () => {
    const user = userEvent.setup();
    jest.spyOn(apiClient, 'get').mockReturnValue(
      Promise.resolve({
        data: defaultValue,
      }),
    );
    jest.spyOn(apiClient, 'delete').mockImplementation(() => Promise.resolve());
    render(<DashboardPage />, {
      wrapper: ConfirmationDialogWrapper,
    });
    const [firstDeleteButton] = screen.getAllByRole('button', { name: /deletar/i });
    await user.click(firstDeleteButton);
    expect(
      screen.getByRole('heading', {
        name: /confirmação de exclusão de candidatura/i,
      }),
    ).toBeInTheDocument;
    await user.click(
      screen.getByRole('button', {
        name: /confirmar/i,
      }),
    );
    expect(await screen.findByText('Candidatura deletada com sucesso')).toBeInTheDocument();
  });

  it('show confirmation modal and error message when trying to delete job application and requests fail', async () => {
    const user = userEvent.setup();
    jest.spyOn(apiClient, 'delete').mockImplementation(() => Promise.reject());
    jest.spyOn(apiClient, 'get').mockReturnValue(
      Promise.resolve({
        data: defaultValue,
      }),
    );
    render(<DashboardPage />, {
      wrapper: ConfirmationDialogWrapper,
    });
    await waitForElementToBeRemoved(() => screen.getByLabelText('carregando'));
    const [firstDeleteButton] = screen.getAllByRole('button', { name: /deletar/i });
    await user.click(firstDeleteButton);
    expect(
      screen.getByRole('heading', {
        name: /confirmação de exclusão de candidatura/i,
      }),
    ).toBeInTheDocument;
    await user.click(
      screen.getByRole('button', {
        name: /confirmar/i,
      }),
    );
    expect(await screen.findByText('Erro ao deletar candidatura')).toBeInTheDocument();
  });

  it('should render empty message when there is no Job Applications available', async () => {
    jest.spyOn(apiClient, 'get').mockReturnValue(
      Promise.resolve({
        data: [],
      }),
    );
    render(<DashboardPage />, {
      wrapper: ConfirmationDialogWrapper,
    });
    expect(await screen.findByText(/Nenhuma candidatura disponível/i)).toBeInTheDocument();
  });
});
