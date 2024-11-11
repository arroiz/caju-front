import styled from 'styled-components';
import { JOB_APPLICATION_STATUS } from '~/types/status';

const jobApplicationStatusStyles: {
  [key in JOB_APPLICATION_STATUS]: { background: string; title: string };
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

export const Column = styled.div<{ status: JOB_APPLICATION_STATUS }>`
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background-color: ${({ status }) => jobApplicationStatusStyles[status].background};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;
`;

export const TitleColumn = styled.h3<{ status: JOB_APPLICATION_STATUS }>`
  color: ${({ status }) => jobApplicationStatusStyles[status].title};
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
