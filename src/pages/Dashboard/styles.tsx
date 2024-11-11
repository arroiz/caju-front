import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

export const LoadingContainer = styled.div`
  position: relative;
  min-height: 20vh;

  &[aria-busy='true'] {
    pointer-events: none;
  }

  &[aria-busy='true'] > [aria-label='carregando'] {
    position: absolute;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
`;
