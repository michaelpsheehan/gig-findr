import React from "react";

const Input = (props) => {
    // console.log(props.value);
    // console.log(props.handleChange);
    return (
        <div className="form-group">
            <label htmlFor={props.name} className="form-label">
                {props.title}
            </label>
            <input
                className="form-control"
                id={props.name}
                name={props.name}
                type={props.inputType}
                value={props.value}
                onChange={props.handleChange}
                // onChange={props.onChangeEvent}
                placeholder={props.placeholder}
                {...props}
            />
        </div>
    );
};

export default Input;
