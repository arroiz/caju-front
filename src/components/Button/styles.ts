import styled, { css } from 'styled-components';

type Variant = 'outline' | 'solid';
type ColorScheme = 'primary' | 'transparent' | 'danger' | 'success' | 'warning';

export type StyledButtonProps = {
  $variant?: Variant;
  $colorScheme?: ColorScheme;
  $size?: 'md' | 'sm';
};

const DEFAULT_VALUES = {
  size: 'md',
  variant: 'solid',
  colorScheme: 'primary',
};

const getVariantStyles = ({ $variant }: StyledButtonProps) =>
  ({
    outline: css`
      border: 1px solid black;
    `,
    solid: css`
      border: none;
    `,
  })[$variant || DEFAULT_VALUES.variant];

const getColorSchemeStyles = ({ $colorScheme }: StyledButtonProps) =>
  ({
    primary: css`
      background-color: #38a169;
      color: #fff;

      &:hover {
        background-color: #2f855a;
      }
    `,
    transparent: css`
      background-color: transparent;

      &:hover {
        background-color: transparent;
      }
    `,
    success: css`
      background-color: rgb(155, 229, 155);

      &:hover {
        background-color: rgba(155, 229, 155, 0.9);
      }
    `,
    danger: css`
      background-color: rgb(255, 145, 154);

      &:hover {
        background-color: rgba(255, 145, 154, 0.9);
      }
    `,
    warning: css`
      background-color: rgb(255, 136, 88);

      &:hover {
        background-color: rgb(255, 136, 88, 0.9);
      }
    `,
  })[$colorScheme || DEFAULT_VALUES.colorScheme];

const getSizeStyles = ({ $size }: StyledButtonProps) =>
  ({
    sm: css`
      font-size: 12px;
      border-radius: 4px;
      padding: 4px 16px;
    `,
    md: css`
      border-radius: 36px;
      font-size: 16px;
      padding: 0 16px;
      font-weight: 600;
      height: 40px;
      min-width: 40px;
    `,
  })[$size || DEFAULT_VALUES.size];

export const Button = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  text-decoration: none;
  transition: background 0.2s ease-in-out;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) => getVariantStyles(props)}
  ${(props) => getSizeStyles(props)}
  ${(props) => getColorSchemeStyles(props)}
`;
