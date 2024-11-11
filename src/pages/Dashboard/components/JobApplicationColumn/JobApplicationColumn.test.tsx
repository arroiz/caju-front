import { render, screen } from '@testing-library/react';
import { JobApplicationColumn } from '.';
import { REGISTRATION_STATUS } from '~/types/status';
import { ConfirmationDialogWrapper } from '~/helpers/testHelpers';

const defaultValue = {
  [REGISTRATION_STATUS.REVIEW]: [
    {
      admissionDate: '22/10/2023',
      email: 'luiz@caju.com.br',
      employeeName: 'Luiz Filho',
      status: REGISTRATION_STATUS.REVIEW,
      cpf: '56642105087',
      id: '3',
    },
  ],
  [REGISTRATION_STATUS.REPROVED]: [
    {
      id: '2',
      admissionDate: '22/10/2023',
      email: 'jose@caju.com.br',
      employeeName: 'José Leão',
      status: REGISTRATION_STATUS.REPROVED,
      cpf: '78502270001',
    },
  ],
  [REGISTRATION_STATUS.APPROVED]: [
    {
      id: '1',
      admissionDate: '22/10/2023',
      email: 'filipe@caju.com.br',
      employeeName: 'Filipe Marins',
      status: REGISTRATION_STATUS.APPROVED,
      cpf: '78502270001',
    },
    {
      id: '2',
      admissionDate: '22/10/2023',
      email: 'filipe@caju.com.br',
      employeeName: 'Filipe Marins',
      status: REGISTRATION_STATUS.APPROVED,
      cpf: '78502270001',
    },
    {
      id: '3',
      admissionDate: '22/10/2023',
      email: 'filipe@caju.com.br',
      employeeName: 'Filipe Marins',
      status: REGISTRATION_STATUS.APPROVED,
      cpf: '78502270001',
    },
    {
      id: '',
      admissionDate: '22/10/2023',
      email: 'filipe@caju.com.br',
      employeeName: 'Filipe Marins',
      status: REGISTRATION_STATUS.APPROVED,
      cpf: '78502270001',
    },
  ],
};

describe('JobApplicationColumn', () => {
  it('should render correct title', () => {
    render(
      <JobApplicationColumn
        title="Aprovado"
        status={REGISTRATION_STATUS.APPROVED}
        jobApplicationList={defaultValue[REGISTRATION_STATUS.APPROVED]}
      />,
      {
        wrapper: ConfirmationDialogWrapper,
      },
    );
    expect(
      screen.getByRole('heading', {
        name: /aprovado/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render all Job Applications passed as prop', () => {
    render(
      <JobApplicationColumn
        title="Aprovado"
        status={REGISTRATION_STATUS.APPROVED}
        jobApplicationList={defaultValue[REGISTRATION_STATUS.APPROVED]}
      />,
      {
        wrapper: ConfirmationDialogWrapper,
      },
    );
    expect(screen.getAllByTestId('column-list-item')).toHaveLength(
      defaultValue[REGISTRATION_STATUS.APPROVED].length,
    );
  });
});
