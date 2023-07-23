import {Component} from 'react'
import Cookies from 'js-cookie'
import LogoutButton from '../LogoutButton'
import './index.css'

class Login extends Component {
  state = {name: 'rahul', password: 'rahul@2021'}

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onclick = async () => {
    const {name, password} = this.state
    const userDetails = {name, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    }
  }

  render() {
    return (
      <div>
        <p>Please Login</p>
        <button onClick={this.onclick} type="button">
          Login with Sample Creds
        </button>
      </div>
    )
  }
}

export default Login
