import classes from './Input.module.scss'
import React from 'react'
function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

export default function Input(props) {
  const inputType = props.type || 'text'
  const cls = [classes.input]
  const errorMessage = isInvalid(props) ? props.errorMessage : null
  // const htmlFor = `${Date.now()}-${inputType}`
  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }
  if (props.type === 'checkbox') {
    cls.push(classes.checkbox)
  }

  return (
    <div className={cls.join(' ')}>
      <label>{props.label}</label>
      <input
        type={inputType}
        // id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        placeholder={errorMessage}
        defaultChecked={false}
      />
    </div>
  )
}
