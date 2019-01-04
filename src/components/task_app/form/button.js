import React from "react";

const Button = (props) => {

    return (
        <button
            className={props.className}
            {...props}

        >


            {props.text} </button>


        //     <input
        //         className="form-control"
        //         id={props.name}
        //         name={props.name}
        //         type={props.inputType}
        //         value={props.value}
        //         onChange={props.handleChange}
        //         placeholder={props.placeholder}
        //         {...props}
        //     />
        // </div>
    );
};

export default Button;
