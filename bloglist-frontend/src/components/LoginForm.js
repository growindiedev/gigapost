import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {useFormik} from 'formik'

const LoginForm = ({handleLogin}) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (values, {resetForm}) => {
      try {
        handleLogin(values.username, values.password)
        resetForm()
      } catch (err) {
        console.error(err)
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        placeholder="username"
        type="text"
        name="username"
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <input 
        placeholder="password"
        type="text"
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      
      <button type={submit}>
        Login
      </button>
    </form>
  )
}

export default LoginForm
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}
