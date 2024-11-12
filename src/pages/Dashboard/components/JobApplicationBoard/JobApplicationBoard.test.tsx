import { render, screen } from '@testing-library/react';
import { JobApplicationBoard } from '.';
import { JOB_APPLICATION_STATUS } from '~/types/status';
import { ConfirmationDialogWrapper } from '~/helpers/testHelpers';

const jobApplicationList = [
  {
    applicationDate: '22/10/2023',
    email: 'luiz@caju.com.br',
    employeeName: 'Luiz Filho',
    status: JOB_APPLICATION_STATUS.REVIEW,
    cpf: '56642105087',
    id: '3',
  },
  {
    id: '2',
    applicationDate: '22/10/2023',
    email: 'jose@caju.com.br',
    employeeName: 'José Leão',
    status: JOB_APPLICATION_STATUS.REPROVED,
    cpf: '78502270001',
  },
  {
    id: '1',
    applicationDate: '22/10/2023',
    email: 'filipe@caju.com.br',
    employeeName: 'Filipe Marins',
    status: JOB_APPLICATION_STATUS.REVIEW,
    cpf: '78502270001',
  },
];

describe('JobApplicationBoard', () => {
  it('should show empty message when there is no Job Applications available', () => {
    render(<JobApplicationBoard jobApplicationList={[]} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    expect(screen.getByText(/nenhuma candidatura disponível\./i)).toBeInTheDocument();
  });

  it('should show render three columns when there is Job Applications available', async () => {
    render(<JobApplicationBoard jobApplicationList={jobApplicationList} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    expect(
      await screen.findByRole('heading', { name: /pronto para revisar/i }),
    ).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /aprovado/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /reprovado/i })).toBeInTheDocument();
  });

  it('should render all names from Job Applications in the screen', () => {
    render(<JobApplicationBoard jobApplicationList={jobApplicationList} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    const [name1, name2, name3] = jobApplicationList;
    expect(screen.getByRole('heading', { name: name1.employeeName })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: name2.employeeName })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: name3.employeeName })).toBeInTheDocument();
  });
});
