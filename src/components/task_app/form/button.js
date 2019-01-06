import React from "react";

const Button = (props) => {

    return (
        <button className={props.className} {...props} > {props.text} </button>
    );
};

export default Button;
