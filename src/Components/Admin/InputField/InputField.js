import React from 'react'
import { useMask } from 'react-mask-field';

export default function InputField(props) {
    const ref = useMask({ mask: '___-__-____', replacement: { _: /\d/ } });
    return (
    <div
    className={`form-floating ${
      props.errors && props.touched ? "is-danger" : ""
    }`}
  >
    <input
      type={props.fieldType}
      className="form-control"
      onChange={props.handleChange}
    //   onKeyUp={props.checkSSN}
      onBlur={props.handleBlur}
      placeholder={props.placeholder}
      name={props.fieldName}
      value={props.values || ""}
      ref={ref}
      required={props.required}
      disabled={props.disabled}
    />
    
    {props.errors && props.touched ? (
      <p className="help is-danger">{props.errors}</p>
    ) : null}
  </div>
  )

}