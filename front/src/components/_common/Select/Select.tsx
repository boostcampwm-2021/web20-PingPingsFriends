import React, { useState } from 'react';
import styled from 'styled-components';
import { Palette } from '@lib/styles/Palette';

const StyledLabel = styled.label`
  margin-top: 5px;

  .label-text {
    font-size: 14px;
    margin: 0 0 5px 5px;
  }
`;

const StyledSelect = styled.select`
  width: 250px;
  height: 45px;
  border-radius: 8px;
  padding-left: 18px;
  border: 1px solid black;
  font-size: 16px;
  .select-holder {
    color: #5b5759;
  }
`;
const ErrorMessageDiv = styled.div`
  position: absolute;
  font-size: 12px;
  transform: translate(10px, 5px);
  color: ${Palette.RED};
`;

interface Options {
  name: string;
  id: number;
}

interface SelectProps {
  name: string;
  id: string;
  options: Options[];
  label?: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  errorMessage?: string;
  value?: string;
}

const Select = ({ options, name, id, label, handleChange, errorMessage, value }: SelectProps) => {
  const [error, setError] = useState('');
  const handleBlur = () => {
    setError(errorMessage!);
  };

  return (
    <StyledLabel htmlFor={id}>
      <div className={'label-text'}>{label}</div>
      <StyledSelect name={name} id={id} onChange={handleChange} onBlur={handleBlur}>
        {value ? <option selected={true}>{value}</option> : <option value={''}>{label} 선택</option>}
        {options.map((option) => (
          <option key={option.id} value={option.id} disabled={!!value}>
            {option.name}
          </option>
        ))}
      </StyledSelect>
      <ErrorMessageDiv>{error}</ErrorMessageDiv>
    </StyledLabel>
  );
};

export default Select;
