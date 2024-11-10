import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  padding-inline: 32px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Card = styled.div`
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  width: min(400px, 100%);
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
