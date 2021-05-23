import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => { 
    return (
      <Jumbotron className='centered'>
      <h1>Anonymous Chat</h1>
      <p>
        This is an anonymous chat. You just need to sign in to join the chat
      </p>
      <div>
        <Link to='/login'><Button variant="primary">Login</Button></Link>
        <Link to='/signup'><Button variant="primary">Sign Up</Button></Link>
      </div>
    </Jumbotron>
    )
}

export default Home