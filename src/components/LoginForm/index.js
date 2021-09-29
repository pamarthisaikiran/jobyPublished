import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorShow: false,
    errorMsg: '',
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  onSubmitSucess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({errorShow: true, errorMsg})
    this.setState({username: '', password: ''})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSucess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserName = () => {
    const {username} = this.state

    return (
      <>
        <label className="heading-user" htmlFor="username">
          USERNAME
        </label>
        <input
          className="user-input"
          id="username"
          value={username}
          placeholder="Username"
          onChange={this.changeUsername}
          type="text"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label className="heading-pass" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="pass-input"
          id="password"
          value={password}
          placeholder="password"
          onChange={this.changePassword}
          type="password"
        />
      </>
    )
  }

  render() {
    const {errorShow, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="container-bg">
        <form className="form" onSubmit={this.onSubmitForm}>
          <img
            className="img-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <div className="username">{this.renderUserName()}</div>
          <div className="password">{this.renderPassword()}</div>
          <button className="btn-login">Login</button>
          {errorShow && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
