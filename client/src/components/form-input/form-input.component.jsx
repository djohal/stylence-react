import React from 'react';
import styled from 'styled-components';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <Group className="group">
    <input
      className="form-input"
      onChange={handleChange}
      {...otherProps}
      autoComplete="off"
    />

    {label ? (
      <label
        className={`${otherProps.value.length ? 'shrink' : ''}
        form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </Group>
);

const Group = styled.div`
  .form-input {
    color: ${({ theme }) => theme.text};

    &:focus ~ .form-input-label {
      color: ${({ theme }) => theme.text};
    }
  }

  .form-input-label {
    &.shrink,
    &:focus {
      color: ${({ theme }) => theme.text};
    }
  }
`;

export default FormInput;
