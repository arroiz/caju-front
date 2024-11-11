import styled, { css } from 'styled-components';

export type StyledIconButtonProps = {
  $colorScheme?: 'primary' | 'ghost';
};

const DEFAULT_VALUES = {
  colorScheme: 'primary',
};

const getColorSchemeStyles = ({ $colorScheme }: StyledIconButtonProps) =>
  ({
    primary: css`
      border: 2px solid #2f855a;

      svg {
        color: #2f855a;
      }

      &:hover {
        border: 2px solid #38a169;

        svg {
          color: #38a169;
        }
      }
    `,
    danger: css`
      border: 2px solid rgb(255, 145, 154);

      svg {
        color: rgb(255, 145, 154);
      }

      &:hover {
        border: 2px solid rgb(255, 145, 154, 0.9);

        svg {
          color: rgb(255, 145, 154, 0.9);
        }
      }
    `,
    ghost: css`
      border: 1px solid black;

      svg {
        color: black;
      }
    `,
  })[$colorScheme || DEFAULT_VALUES.colorScheme];

export const IconButton = styled.button<StyledIconButtonProps>`
  cursor: pointer;
  width: fit-content;
  padding: 4px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  transition: background 0.3s ease-in-out;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) => getColorSchemeStyles(props)}
`;
