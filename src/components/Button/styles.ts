import styled, { css } from 'styled-components';

type ButtonProps = {
  size: 'md' | 'sm';
  bgcolor?: string;
  color?: string;
};

const defaultSize = 'md';

const getSizeStyles = (props: ButtonProps) => {
  const styles = {
    sm: css`
      font-size: 12px;
      border-radius: 4px;
      padding: 4px 16px;
      background-color: ${props.bgcolor ?? 'none'};
      color: ${props.color ?? '#000'};
    `,
    md: css`
      border-radius: 36px;
      font-size: 16px;
      padding: 8px 32px;
      background-color: #64a98c;
      color: #fff;
      font-weight: 600;
      height: 56px;
    `,
  };

  return styles[props.size || defaultSize];
};

export const Button = styled.button<ButtonProps>`
  outline: none;
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  text-decoration: none;
  ${(props) => getSizeStyles(props)}
`;
