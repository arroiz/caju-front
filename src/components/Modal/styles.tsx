import styled from 'styled-components';

export const Modal = styled.dialog`
  background: #fafafa;
  border-radius: 16px;
  padding: 16px;
  min-width: min(80vw, 500px);
  min-height: min(50vh, 200px);
  border: none;
  box-shadow:
    0 10px 38px -10px #555,
    0 10px 20px -15px #555;

  &::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }

  &[open] {
    -webkit-animation: show 0.5s ease normal;
  }

  @-webkit-keyframes show {
    from {
      transform: translateY(-20%);
    }
    to {
      transform: translateY(0%);
    }
  }
`;
