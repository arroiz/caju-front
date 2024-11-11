import styled from 'styled-components';
import { IconButton } from '~/components/IconButton';

export const Card = styled.div`
  border: 4px solid #fff;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;

  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
`;

export const InformationList = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InformationItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;

  ${IconButton} {
    margin-left: auto;
  }
`;
