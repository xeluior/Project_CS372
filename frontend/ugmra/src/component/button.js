const Button = (buttonText, clickEvent) => {
  return (
    <>
      <input type="button" value={buttonText} onClick={clickEvent}></input>
    </>
  );
};

export default Button;
