import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  & input {
    max-width: 300px;
  }
`;

export const InputCpfContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  min-width: fit-content;
  gap: 16px;
  flex: 1;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;
