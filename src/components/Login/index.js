import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErr: false, errMsg: ''}

  onEnteringUserName = event => {
    this.setState({username: event.target.value})
  }

  onEnteringUserPassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessFormSubmission = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureFormSubmission = errMsg => {
    this.setState({errMsg, showErr: true})
  }

  onSubmittingForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    console.log(data)

    if (response.ok === true) {
      this.onSuccessFormSubmission(data.jwt_token)
    } else {
      this.onFailureFormSubmission(data.error_msg)
    }
  }

  render() {
    const {username, password, showErr, errMsg} = this.state
    return (
      <div className="app-container">
        <div className="image-container">
          <img
            className="login-image"
            src="https://res.cloudinary.com/djugcf64d/image/upload/v1680919798/Rectangle_1467_q0eddi.png"
            alt="login book"
          />
        </div>
        <div className="form-container">
          <form className="form" onSubmit={this.onSubmittingForm}>
            <div className="login-logo-container">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/djugcf64d/image/upload/v1680943074/Group_7730_moxigd.png"
                alt="website logo"
              />
              <span className="logo-text">OOK HUB</span>
            </div>
            <div className="input-container">
              <label htmlFor="username" className="label">
                Username*
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter the username"
                value={username}
                onChange={this.onEnteringUserName}
              />
            </div>
            <div className="input-container">
              <label htmlFor="username" className="label">
                Password*
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter the password"
                value={password}
                onChange={this.onEnteringUserPassword}
              />
            </div>
            {showErr ? <p className="err-msg">{errMsg}</p> : null}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
