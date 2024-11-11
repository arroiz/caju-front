import { NewJobApplicationForm } from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const selectors = {
  inputs: {
    name: () => screen.getByPlaceholderText(/nome/i),
    email: () => screen.getByPlaceholderText(/email/i),
    cpf: () => screen.getByPlaceholderText(/cpf/i),
    applicationDate: () => screen.getByTestId(/application-date-input/i),
  },
  submitButton: () => screen.getByRole('button', { name: /cadastrar/i }),
};

describe('NewJobApplicationForm', () => {
  it('should show form with all fields', () => {
    const onSubmitMock = jest.fn();
    render(<NewJobApplicationForm onSubmit={onSubmitMock} />);
    expect(selectors.inputs.name()).toBeInTheDocument();
    expect(selectors.inputs.email()).toBeInTheDocument();
    expect(selectors.inputs.cpf()).toBeInTheDocument();
    expect(selectors.inputs.applicationDate()).toBeInTheDocument();
    expect(selectors.submitButton()).toBeInTheDocument();
  });

  it.each`
    value                     | errorMessage
    ${'a'}                    | ${'O nome completo deve ter pelo menos 2 letras.'}
    ${'123 feijão com arroz'} | ${'O nome completo não pode começar com um número.'}
    ${'marquinhos'}           | ${'O nome completo deve ter pelo menos um espaço.'}
  `(
    'should show $errorMessage when the value is $value on name input ',
    async ({ value, errorMessage }) => {
      const user = userEvent.setup();
      const onSubmitMock = jest.fn();
      render(<NewJobApplicationForm onSubmit={onSubmitMock} />);
      const nameInput = selectors.inputs.name();
      await user.click(nameInput);
      await user.keyboard(value);
      const submitButton = selectors.submitButton();
      await user.click(submitButton);
      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    },
  );

  it('should show invalid email error message when the e-mail is invalid', async () => {
    const user = userEvent.setup();
    const onSubmitMock = jest.fn();
    render(<NewJobApplicationForm onSubmit={onSubmitMock} />);
    const emailInput = selectors.inputs.email();
    await user.click(emailInput);
    await user.keyboard('marcos@s');
    const submitButton = selectors.submitButton();
    await user.click(submitButton);
    expect(await screen.findByText(/Por favor, insira um e-mail válido./i)).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('should show invalid cpf error message when the cpf is invalid', async () => {
    const user = userEvent.setup();
    const onSubmitMock = jest.fn();
    render(<NewJobApplicationForm onSubmit={onSubmitMock} />);
    const cpfInput = selectors.inputs.cpf();
    await user.click(cpfInput);
    await user.keyboard('123456789');
    const submitButton = selectors.submitButton();
    await user.click(submitButton);
    expect(await screen.findByText(/CPF inválido./i)).toBeInTheDocument();
    expect(cpfInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('should call onSubmit when the form is filled out correctly', async () => {
    const user = userEvent.setup();
    const onSubmitMock = jest.fn();
    render(<NewJobApplicationForm onSubmit={onSubmitMock} />);
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
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });
});
