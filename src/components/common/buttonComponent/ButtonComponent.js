import React from "react";
import PropTypes from "prop-types";
import "./ButtonComponent.scss";

/**
 *
 * @param {Function} - button click handler
 *
 * @param {string} - button label
 *
 *
 * @param {boolean} - button disabled status
 *
 *
 * @returns - button jsx
 *
 */

const ButtonComponent = ({ clickHandler, label, disabled }) => {
  return (
    <button
      onClick={clickHandler}
      disabled={disabled}
      className="primaryButton"
    >
      {label}
    </button>
  );
};

ButtonComponent.propTypes = {
  clickHandler: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ButtonComponent;
