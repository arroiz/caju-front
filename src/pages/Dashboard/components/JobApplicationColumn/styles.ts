import styled from 'styled-components';
import { REGISTRATION_STATUS } from '~/types/status';

const registrationStatusStyles: {
  [key in REGISTRATION_STATUS]: { background: string; title: string };
} = {
  REVIEW: {
    background: '#FDF8E9',
    title: '#EFC24D',
  },
  APPROVED: {
    background: '#EEEEFD',
    title: '#4242DF',
  },
  REPROVED: {
    background: '#FBEDF6',
    title: '#CE2893',
  },
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;
`;

export const Column = styled.div<{ status: REGISTRATION_STATUS }>`
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background-color: ${({ status }) => registrationStatusStyles[status].background};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;
`;

export const TitleColumn = styled.h3<{ status: REGISTRATION_STATUS }>`
  color: ${({ status }) => registrationStatusStyles[status].title};
`;

export const ColumnList = styled.ul`
  max-height: 85%;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ColumnListItem = styled.li``;
