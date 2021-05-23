import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {signin} from '../helpers/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)


  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await signin(email, password)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <FormContainer>
      <h1 className='text-center'>Sign In</h1>
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

        <Button className='w-100 mt-3' type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3 text-center'>
        <Col>
          New User?{' '}
          <Link to='/signup'>
            Sign Up
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Login