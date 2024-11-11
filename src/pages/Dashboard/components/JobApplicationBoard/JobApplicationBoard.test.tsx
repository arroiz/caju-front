import { render, screen } from '@testing-library/react';
import { JobApplicationBoard } from '.';
import { JOB_APPLICATION_STATUS } from '~/types/status';
import { ConfirmationDialogWrapper } from '~/helpers/testHelpers';

const defaultValue = {
  [JOB_APPLICATION_STATUS.REVIEW]: [
    {
      applicationDate: '22/10/2023',
      email: 'luiz@caju.com.br',
      employeeName: 'Luiz Filho',
      status: JOB_APPLICATION_STATUS.REVIEW,
      cpf: '56642105087',
      id: '3',
    },
  ],
  [JOB_APPLICATION_STATUS.REPROVED]: [
    {
      id: '2',
      applicationDate: '22/10/2023',
      email: 'jose@caju.com.br',
      employeeName: 'José Leão',
      status: JOB_APPLICATION_STATUS.REPROVED,
      cpf: '78502270001',
    },
  ],
  [JOB_APPLICATION_STATUS.APPROVED]: [
    {
      id: '1',
      applicationDate: '22/10/2023',
      email: 'filipe@caju.com.br',
      employeeName: 'Filipe Marins',
      status: JOB_APPLICATION_STATUS.REVIEW,
      cpf: '78502270001',
    },
  ],
};

const emptyValue = {
  APPROVED: [],
  REPROVED: [],
  REVIEW: [],
};

describe('JobApplicationBoard', () => {
  it('should show empty message when there is no Job Applications available', () => {
    render(<JobApplicationBoard jobApplications={emptyValue} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    expect(screen.getByText(/nenhuma candidatura disponível\./i)).toBeInTheDocument();
  });

  it('should show render three columns when there is Job Applications available', () => {
    render(<JobApplicationBoard jobApplications={defaultValue} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    expect(screen.getByRole('heading', { name: /pronto para revisar/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /aprovado/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /reprovado/i })).toBeInTheDocument();
  });

  it('should render all names from Job Applications in the screen', () => {
    render(<JobApplicationBoard jobApplications={defaultValue} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    const [name1, name2, name3] = Object.values(defaultValue).map((list) => list[0].employeeName);
    expect(screen.getByRole('heading', { name: name1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: name2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: name3 })).toBeInTheDocument();
  });
});
