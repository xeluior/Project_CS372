import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <button 
      type={props.type} 
      value={props.value} 
      className={props.className} 
      onClick={props.clickEvent}
    >
      {props.buttonText}
    </button>
  );
}

Button.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.string,
    buttonText: PropTypes.string,
    clickEvent: PropTypes.func,
};

export default Button;
