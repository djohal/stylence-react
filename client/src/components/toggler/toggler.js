import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

const ToggleBtn = styled(Toggle)`
  &.react-toggle--checked .react-toggle-track {
    background-color: #3c3b3b;
  }

  &.react-toggle--checked:hover:not(.react-toggle--disabled)
    .react-toggle-track {
    background-color: black;
  }

  .react-toggle-track-check {
    height: 100%;

    img {
      position: absolute;
      width: 1.25rem;
      top: 1px;
      left: -4px;
    }
  }

  .react-toggle-track-x {
    height: 100%;

    img {
      position: absolute;
      width: 1.25rem;
      top: 2px;
      left: -4px;
    }
  }

  .react-toggle-thumb {
    border: none;
  }
`;

const ToggleContainer = ({ theme, toggleTheme }) => {
  return (
    <ToggleBtn
      className="option"
      onClick={toggleTheme}
      icons={{
        checked: (
          <img src="https://img.icons8.com/emoji/48/000000/crescent-moon-emoji.png" />
        ),
        unchecked: (
          <img src="https://img.icons8.com/offices/30/000000/sun.png" />
        ),
      }}
    />
  );
};

ToggleContainer.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default ToggleContainer;
