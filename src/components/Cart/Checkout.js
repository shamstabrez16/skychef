import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";

const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {

    const[formvalidity, setFormValidity]= useState({
        name: true,
        street: true,
        postal : true,
        city : true
        
    }); 
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const postalIsValid = isFiveChars(postal);
    const cityIsValid = !isEmpty(city);
    setFormValidity({
        name: nameIsValid,
        street: streetIsValid,
        postal : postalIsValid,
        city : cityIsValid 
    });

    const isFormValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;
    if(!isFormValid){
        return;
    }

    props.onConfirm({
        name,
        street,
        postal,
        city 
    })
    //submit card data here 
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control}  ${formvalidity.name? '':classes.invalid}` }>
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!formvalidity.name && <p>Please enter valid name !</p>}
      </div>
      <div className={`${classes.control}  ${formvalidity.street? '':classes.invalid}` }>
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id="street" />
        {!formvalidity.street && <p>Please enter valid  street !</p>}
      </div>
      <div className={`${classes.control}  ${formvalidity.postal? '':classes.invalid}` }>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalRef} type="text" id="postal" />
        {!formvalidity.postal && <p>Please enter valid  postal !</p>}
      </div>
      <div className={`${classes.control}  ${formvalidity.city? '':classes.invalid}` }>
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!formvalidity.postal && <p>Please enter valid  city !</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
