import React from "react";

import { useMask } from 'react-mask-field';

export default function InputField(props) {
  const ref = useMask({ mask: '___-__-____', replacement: { _: /\d/ } });

  if (props.fieldName === "username") {
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
          onKeyUp={props.checkUser}
          onBlur={props.handleBlur}
          placeholder={props.placeholder}
          name={props.fieldName}
          value={props.values || ""}
          disabled={props.disabled}
          required
        />
        <label>
          <span className={`${props.required ? "d-inline-block" : "d-none"}`}>
            *{" "}
          </span>{" "}
          {props.spanText}
        </label>

        {props.errors && props.touched ? (
          <p className="help is-danger">{props.errors}</p>
        ) : null}
      </div>
    );
  } else if (props.fieldName === "email") {
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
          onKeyUp={props.checkEmail}
          onBlur={props.handleBlur}
          placeholder={props.placeholder}
          name={props.fieldName}
          value={props.values || ""}
          disabled={props.disabled}
          required
        />
        <label>
          <span className={`${props.required ? "d-inline-block" : "d-none"}`}>
            *{" "}
          </span>{" "}
          {props.spanText}
        </label>

        {props.errors && props.touched ? (
          <p className="help is-danger">{props.errors}</p>
        ) : null}
      </div>
    );
  } 
  else if (props.fieldName === "ssn") {
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
          onKeyUp={props.checkSSN}
          onBlur={props.handleBlur}
          placeholder={props.placeholder}
          name={props.fieldName}
          value={props.values || ""}
          ref={ref}
          required={props.required}
          disabled={props.disabled}
        />
        
        <label>
          <span className={`${props.required ? "d-inline-block" : "d-none"}`}>
            *{" "}
          </span>{" "}
          {props.spanText}
        </label>

        {props.errors && props.touched ? (
          <p className="help is-danger">{props.errors}</p>
        ) : null}
      </div>
    );
  } 
  else {
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
          onBlur={props.handleBlur}
          placeholder={props.placeholder}
          name={props.fieldName}
          value={props.values || ""}
          disabled={props.disabled}
          required
        />
        <label>
          <span className={`${props.required ? "d-inline-block" : "d-none"}`}>
            *{" "}
          </span>{" "}
          {props.spanText}
        </label>

        {props.errors && props.touched ? (
          <p className="help is-danger">{props.errors}</p>
        ) : null}
      </div>
    );
  }
}
