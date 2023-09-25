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

export default Button;
