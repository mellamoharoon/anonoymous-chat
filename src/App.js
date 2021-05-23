import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {auth} from './services/firebase'
import SignUp from './screens/SignUp'
import Home from './screens/Home'
import Login from './screens/Login'
import Chat from './screens/Chat'
import Header from './components/Header'
import Footer from './components/Footer'
import Loader from './components/Loader'
import { Container } from 'react-bootstrap'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true)
        setLoading(false)
      } else {
        setAuthenticated(false)
        setLoading(false)
      }
    })
  })

  function PrivateRoute({ component: Component, authenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => authenticated === true
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
      />
    )
  }

  function PublicRoute({ component: Component, authenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => authenticated === false
          ? <Component {...props} />
          : <Redirect to='/chat' />}
      />
    )
  }

  return loading === true ? <Loader /> : (
    <Router>
      <Header />
      <main className='py-3'>
      <Container>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute path="/chat" authenticated={authenticated} component={Chat}></PrivateRoute>
        <PublicRoute path="/signup" authenticated={authenticated} component={SignUp}></PublicRoute>
        <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
      </Switch>
      </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
