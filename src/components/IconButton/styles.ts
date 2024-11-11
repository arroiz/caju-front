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
      border: 2px solid #32be32;

      svg {
        color: #32be32;
      }

      &:hover {
        border: 2px solid #59d359;

        svg {
          color: #59d359;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) => getColorSchemeStyles(props)}
`;
