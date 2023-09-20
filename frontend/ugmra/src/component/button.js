const Button = ({ buttonText, clickEvent }) => {
  return (
    <button type="button" value="Search" className="search_button" onClick={clickEvent}>{buttonText}</button>
  );
};
export default Button;
