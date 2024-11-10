import styled from 'styled-components';

export const Label = styled.label`
  font-size: 14px;
  color: #111;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0 8px;
  border-radius: 2px;
  max-width: 100%;
  min-height: 36px;
  background-color: #ffffff;
  font-size: 16px;
  font-weight: normal;
  border-radius: 8px;
  border: 1px solid rgba(36, 28, 21, 0.3);

  &:focus-visible {
    outline-width: 1px;
    outline-color: #007c89;
    border-color: #007c89;
  }

  &[aria-invalid='true'] {
    outline-width: 1px;
    outline-color: red;
    border-color: red;
  }
  }
`;

export const ErrorMessage = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: red;
  visibility: hidden;

  [aria-invalid='true'] ~ & {
    visibility: visible;
  }
`;
