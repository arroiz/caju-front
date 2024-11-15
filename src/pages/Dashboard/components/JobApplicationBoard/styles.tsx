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

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, min(calc(100vw - 48px), 500px));
  overflow-x: auto;
  grid-gap: 24px;
  justify-content: flex-start;
  margin-top: 24px;

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Column = styled.div<{ status: JOB_APPLICATION_STATUS }>`
  height: auto;
  background-color: ${({ status }) => jobApplicationStatusStyles[status].background};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;
`;

export const Description = styled.p`
  width: 100%;
  font-size: 16px;
  text-align: center;
  margin-top: 32px;
`;

export const TitleColumn = styled.h3<{ status: JOB_APPLICATION_STATUS }>`
  margin: 0px;
  color: ${({ status }) => jobApplicationStatusStyles[status].title};
  margin: 24px;
`;
