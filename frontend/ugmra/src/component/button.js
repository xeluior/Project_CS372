const Button = ({ 
  buttonText, 
  clickEvent, 
  type = "button", 
  value = "", 
  className = "search_button" 
}) => {
  return (
    <button 
      type={type} 
      value={value} 
      className={className} 
      onClick={clickEvent}
    >
      {buttonText}
    </button>
  );
}

export default Button;
