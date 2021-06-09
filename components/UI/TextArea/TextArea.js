import classes from './TextArea.module.scss'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

export default function TextArea(props) {
  const cls = [classes.textarea]
  const errorMessage = isInvalid(props) ? props.errorMessage : null
  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }
  return (
    <div className={cls.join(' ')}>
      <label htmlFor={classes.textarea}>{props.label}</label>
      <textarea
        value={props.value}
        onChange={props.onChange}
        placeholder={errorMessage}
        id={classes.textarea}
      >
      </textarea>
    </div>
  )
}