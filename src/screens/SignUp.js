import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message.js'
import FormContainer from '../components/FormContainer'
import {signup, signInWithGoogle} from '../helpers/auth'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      try {
        await signup(email, password)
      } catch (error) {
        setError(error.message)
      }
    }
  }

  const googleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <FormContainer>
      <h1 className='text-center'>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className='w-100 mt-3' type='submit' variant='primary'>
          Sign Up
        </Button>
        <p className='text-center'>Or</p>
        <Button className='w-100' onClick={googleSignIn}>Sign Up With Google</Button>
      </Form>

      <Row className='py-3 text-center'>
        <Col>
          Have an Account?{' '}
          <Link to='/login'>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default SignUp