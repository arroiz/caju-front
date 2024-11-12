import { render, screen } from '@testing-library/react';
import { JobApplicationColumn } from '.';
import { JOB_APPLICATION_STATUS } from '~/types/status';
import { ConfirmationDialogWrapper } from '~/helpers/testHelpers';

const jobApplicationList = {
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
      status: JOB_APPLICATION_STATUS.APPROVED,
      cpf: '78502270001',
    },
    {
      id: '2',
      applicationDate: '22/10/2023',
      email: 'filipe@caju.com.br',
      employeeName: 'Filipe Marins',
      status: JOB_APPLICATION_STATUS.APPROVED,
      cpf: '78502270001',
    },
    {
      id: '3',
      applicationDate: '22/10/2023',
      email: 'filipe@caju.com.br',
      employeeName: 'Filipe Marins',
      status: JOB_APPLICATION_STATUS.APPROVED,
      cpf: '78502270001',
    },
    {
      id: '',
      applicationDate: '22/10/2023',
      email: 'filipe@caju.com.br',
      employeeName: 'Filipe Marins',
      status: JOB_APPLICATION_STATUS.APPROVED,
      cpf: '78502270001',
    },
  ],
};

describe('JobApplicationColumn', () => {
  it('should render correct title', () => {
    render(
      <JobApplicationColumn
        title="Aprovado"
        status={JOB_APPLICATION_STATUS.APPROVED}
        jobApplicationList={jobApplicationList[JOB_APPLICATION_STATUS.APPROVED]}
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
        status={JOB_APPLICATION_STATUS.APPROVED}
        jobApplicationList={jobApplicationList[JOB_APPLICATION_STATUS.APPROVED]}
      />,
      {
        wrapper: ConfirmationDialogWrapper,
      },
    );
    expect(screen.getAllByTestId('column-list-item')).toHaveLength(
      jobApplicationList[JOB_APPLICATION_STATUS.APPROVED].length,
    );
  });
});
