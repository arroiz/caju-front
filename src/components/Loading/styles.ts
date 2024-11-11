import styled from 'styled-components';

export const LoadingDots = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #32be32;
  color: #32be32;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;

  &:before,
  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }

  &:before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #32be32;
    color: #32be32;
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 0s;
  }

  &:after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #32be32;
    color: #32be32;
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dot-flashing {
    0% {
      background-color: #32be32;
    }
    50%,
    100% {
      background-color: rgba(50, 190, 50, 0.2);
    }
  }
`;
