import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';

interface ButtonProps {
  borderColor?: string;
}

const Button = styled.button<ButtonProps>`
  width: 100px;
  height: 45px;
  color: black;
  border: 1px solid ${({ borderColor }) => (borderColor ? borderColor : Palette.ACTIVE)};
  background: none;
  border-radius: 8px;
  transition: 0.5s ease all;
  &.active {
    color: white;
    background: ${Palette.ACTIVE};
  }
`;

export default Button;
