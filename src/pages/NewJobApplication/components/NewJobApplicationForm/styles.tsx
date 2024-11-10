import styled from 'styled-components';
import { Button } from '~/components/Button';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${Button} {
    align-self: flex-end;
  }
`;
