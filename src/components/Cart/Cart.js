import React,{ useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/Cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);


  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHanlder = () => {
    setShowCheckout(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const submitOrderHandler= async (userData)=>{
    setIsSubmitting(true);
   await fetch('https://meals-http-365f3-default-rtdb.firebaseio.com/orders.json',{
    method:'POST',
    body:JSON.stringify({
      user: userData,
      orderItems: cartCtx.items
    })

   });
   setIsSubmitting(false);
   setDidSubmit(true);
   cartCtx.clearCart();

  };

  const modalActions = <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={orderHanlder}>
            Order
          </button>
        )}
      </div>

  const cartModalContent = <React.Fragment>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && <Checkout onConfirm = {submitOrderHandler} onCancel={props.onClose}/>}
      {!showCheckout && modalActions}
      
  </React.Fragment>
  
  const isSubmittingModalContent =<p>sending order data .... </p> 
  const didSubmitModalContent =
  <React.Fragment>
      <p>successfully sent order...</p> 
    <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
  </React.Fragment>


  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {! isSubmitting && didSubmit && didSubmitModalContent}

    </Modal>
  );
};

export default Cart;
