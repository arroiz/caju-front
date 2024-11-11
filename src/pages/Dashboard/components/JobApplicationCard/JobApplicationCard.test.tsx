import { render, screen } from '@testing-library/react';
import { JobApplicationCard } from '.';
import { ConfirmationDialogWrapper } from '~/helpers/testHelpers';
import { REGISTRATION_STATUS } from '~/types/status';
import userEvent from '@testing-library/user-event';

const jobApplication = {
  id: '1',
  admissionDate: '22/10/2023',
  email: 'filipe@caju.com.br',
  employeeName: 'Filipe Marins',
  status: REGISTRATION_STATUS.REVIEW,
  cpf: '78502270001',
};

describe('JobApplicationCard', () => {
  it('should render name, email and admission date in the card', () => {
    render(<JobApplicationCard jobApplication={jobApplication} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    expect(
      screen.getByRole('heading', {
        name: jobApplication.employeeName,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(jobApplication.email)).toBeInTheDocument();
    expect(screen.getByText(jobApplication.admissionDate)).toBeInTheDocument();
  });

  it('should render approve, repprove and delete button when the job application is on Review', () => {
    render(<JobApplicationCard jobApplication={jobApplication} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    expect(
      screen.getByRole('button', {
        name: /reprovar/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /aprovar/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /deletar/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render review and delete button when the job application is Approved', () => {
    render(
      <JobApplicationCard
        jobApplication={{ ...jobApplication, status: REGISTRATION_STATUS.APPROVED }}
      />,
      {
        wrapper: ConfirmationDialogWrapper,
      },
    );
    expect(
      screen.getByRole('button', {
        name: /revisar novamente/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /deletar/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render review and delete button when the job application is Reproved', () => {
    render(
      <JobApplicationCard
        jobApplication={{ ...jobApplication, status: REGISTRATION_STATUS.APPROVED }}
      />,
      {
        wrapper: ConfirmationDialogWrapper,
      },
    );
    expect(
      screen.getByRole('button', {
        name: /revisar novamente/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /deletar/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render confirmation modal when reprove button is clicked', async () => {
    const user = userEvent.setup();
    render(<JobApplicationCard jobApplication={jobApplication} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    const reproveButton = screen.getByRole('button', {
      name: /reprovar/i,
    });
    await user.click(reproveButton);
    expect(
      screen.getByRole('heading', {
        name: /confirmar alteração de status/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /confirma alteração de status da candidatura de filipe marins para reproved\?/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /confirmar/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /cancelar/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render confirmation modal when approve button is clicked', async () => {
    const user = userEvent.setup();
    render(<JobApplicationCard jobApplication={jobApplication} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    const reproveButton = screen.getByRole('button', {
      name: /aprovar/i,
    });
    await user.click(reproveButton);
    expect(
      screen.getByRole('heading', {
        name: /confirmar alteração de status/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /confirma alteração de status da candidatura de filipe marins para approved\?/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /confirmar/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /cancelar/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render confirmation modal when review again button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <JobApplicationCard
        jobApplication={{ ...jobApplication, status: REGISTRATION_STATUS.APPROVED }}
      />,
      {
        wrapper: ConfirmationDialogWrapper,
      },
    );
    const reproveButton = screen.getByRole('button', {
      name: /revisar novamente/i,
    });
    await user.click(reproveButton);
    expect(
      screen.getByRole('heading', {
        name: /confirmar alteração de status/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /confirma alteração de status da candidatura de filipe marins para review\?/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /confirmar/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /cancelar/i,
      }),
    ).toBeInTheDocument();
  });

  it('should render confirmation modal when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<JobApplicationCard jobApplication={jobApplication} />, {
      wrapper: ConfirmationDialogWrapper,
    });
    const reproveButton = screen.getByRole('button', {
      name: /deletar/i,
    });
    await user.click(reproveButton);
    expect(
      screen.getByRole('heading', {
        name: /Confirmação de Exclusão de Candidatura/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Confirma a exclusão da candidatura de Filipe Marins\? Esta ação não poderá ser desfeita./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /confirmar/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /cancelar/i,
      }),
    ).toBeInTheDocument();
  });
});
