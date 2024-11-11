import styled from 'styled-components';

export const Dialog = styled.dialog`
  background: #fafafa;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: min(95vw, 600px);
  height: fit-content;
  border: none;
  margin-inline: auto;
  margin-top: 20vh;
  box-shadow:
    0 10px 38px -10px #555,
    0 10px 20px -15px #555;

  &::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }

  &[open] {
    -webkit-animation: show 0.5s ease normal;
    display: flex;
    flex-direction: column;
    gap: 32px;
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

export const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DialogTitle = styled.h3`
  font-size: 18px;
`;
export const DialogDescription = styled.p`
  font-size: 16px;
`;

export const DialogFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`;
