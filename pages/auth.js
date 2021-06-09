// import {useState} from 'react'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import axios from 'axios'
import React, {useState} from 'react'
import {useCookies} from 'react-cookie'
// import Router from 'next/router'
import { useRouter } from 'next/router'

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export default function Auth() {
  // const [cookie, setCookie] = useCookies(['admin'])
  const [formControls, setFormControls] = useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите корректный email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      },
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Введите корректный пароль',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6,
      },
    },
  })

  const [isFormValid, setIsFormValid] = useState(false)
  const router = useRouter()

  const loginHandler = async () => {
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true,
    }
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAq2rBuSAzIX6WyZRrAcfZ4eGLPBapcaL8',
        authData
      )

      const data = response.data.idToken
      

      // setCookie('admin', data, {
      //   path: '/',
      //   maxAge: 3600, // Expires after 1hr
      //   sameSite: true,
      // })
      
      fetch('/api/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: data}),
      })
      router.push('/reviews')
    } catch (error) {
      console.log(error)
    }
  }

  const registerHandler = async () => {
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true,
    }
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAq2rBuSAzIX6WyZRrAcfZ4eGLPBapcaL8',
        authData
      )
    } catch (error) {
      console.log(error)
    }
  }

  const submitHandler = (event) => {
    event.preventDefault()
  }

  const validateControl = (value, validation) => {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  const onChangeHandler = (event, controlName) => {
    let cloneControls = {...formControls}
    let control = cloneControls[controlName]

    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    let isFormValidClone = true

    Object.keys(cloneControls).forEach((controlName) => {
      isFormValidClone = formControls[controlName].valid && isFormValidClone
    })

    setIsFormValid(isFormValidClone)

    setFormControls({
      ...cloneControls,
    })
  }

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => onChangeHandler(event, controlName)}
        />
      )
    })
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1>Авторизация</h1>
        {renderInputs()}
        <div className="flex-sb">
          <Button type="success" onClick={loginHandler} disabled={!isFormValid}>
            Войти
          </Button>
          <Button
            type="primary"
            onClick={registerHandler}
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  )
}
