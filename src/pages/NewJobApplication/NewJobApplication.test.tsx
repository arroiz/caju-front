import { NewJobApplication } from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { apiClient } from '~/config/apiClient';
import { ReactQueryTestWrapper } from '~/helpers/testHelpers';
import { routes } from '~/router/routes';
import { JOB_APPLICATION_STATUS } from '~/types/status';

const selectors = {
  inputs: {
    name: () => screen.getByPlaceholderText(/nome/i),
    email: () => screen.getByPlaceholderText(/email/i),
    cpf: () => screen.getByPlaceholderText(/cpf/i),
    applicationDate: () => screen.getByTestId(/application-date-input/i),
  },
  submitButton: () => screen.getByRole('button', { name: /cadastrar/i }),
  backLink: () => screen.getByRole('link', { name: /voltar/i }),
};

describe('NewJobApplication', () => {
  it('should render back button and New Job Application Form', () => {
    render(<NewJobApplication />, {
      wrapper: ReactQueryTestWrapper,
    });
    expect(selectors.backLink()).toBeInTheDocument();
    expect(selectors.inputs.name()).toBeInTheDocument();
    expect(selectors.inputs.email()).toBeInTheDocument();
    expect(selectors.inputs.cpf()).toBeInTheDocument();
    expect(selectors.inputs.applicationDate()).toBeInTheDocument();
    expect(selectors.submitButton()).toBeInTheDocument();
  });

  it('should call create job application service when submit the form and navigate to home after creation', async () => {
    const user = userEvent.setup();
    jest.spyOn(apiClient, 'post').mockReturnValue(
      Promise.resolve({
        data: {
          id: '1',
          applicationDate: '2024-10-10',
          email: 'marcosvtd@caju.com.br',
          employeeName: 'marcos taron',
          status: JOB_APPLICATION_STATUS.APPROVED,
          cpf: '78502270001',
        },
      }),
    );
    render(<NewJobApplication />, {
      wrapper: ReactQueryTestWrapper,
    });
    const nameInput = selectors.inputs.name();
    await user.click(nameInput);
    await user.keyboard('marcos taron');
    const emailInput = selectors.inputs.email();
    await user.click(emailInput);
    await user.keyboard('marcosvtd@gmail.com');
    const cpfInput = selectors.inputs.cpf();
    await user.click(cpfInput);
    await user.keyboard('23650697033');
    const applicationDateInput = selectors.inputs.applicationDate();
    await user.click(applicationDateInput);
    await user.keyboard('2024-10-10');
    const submitButton = selectors.submitButton();
    await user.click(submitButton);
    expect(window.location.pathname).toBe(routes.dashboard);
  });
});
