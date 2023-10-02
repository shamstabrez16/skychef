import React from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
      <h1>Sky Chef</h1>
     <HeaderCartButton/>
      </header>
      <div>
        <img className={classes['main-image']} src={mealsImage} alt="kitchen full of food" />
      </div>
    </React.Fragment>
  );
};

export default Header;
