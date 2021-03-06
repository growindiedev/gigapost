import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {useFormik} from 'formik'

const RegisterForm = ({handleRegister}) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      name: ''
    },
    onSubmit: (values, {resetForm}) => {
      try {
        handleRegister(values.username, values.password, values.name)
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
      <input 
        placeholder="name"
        type="text"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      
      <button type="submit">
        Sign Up
      </button>
    </form>
  )
}

export default RegisterForm
RegisterForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}
