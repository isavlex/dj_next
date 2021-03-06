import classes from './Button.module.scss'

export default function Button(props) {
  const cls = [classes.Button, classes[props.addMod]]
  return (
    <button
      onClick={props.onClick}
      className={cls.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
