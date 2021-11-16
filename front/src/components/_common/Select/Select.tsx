import React from 'react';
import styled from 'styled-components';

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
interface SelectProps {
  name: string;
  id: string;
  options: string[];
  label?: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}

const Select = ({ options, name, id, label, handleChange }: SelectProps) => {
  return (
    <StyledLabel htmlFor={id}>
      <div className={'label-text'}>{label}</div>
      <StyledSelect name={name} id={id} onChange={handleChange}>
        <option disabled>{label} 선택</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
    </StyledLabel>
  );
};

export default Select;
