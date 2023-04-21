import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {isMenuShow: false}

  onClickingMenuBar = () => {
    this.setState(prevState => ({isMenuShow: !prevState.isMenuShow}))
  }

  onClickingCloseIcon = () => {
    this.setState(prevState => ({isMenuShow: !prevState.isMenuShow}))
  }

  onClickingLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  renderNavitemsContainer = () => (
    <div className="nav-items-container">
      <Link to="/" className="nav-item">
        Home
      </Link>
      <Link to="/bookshelves" className="nav-item">
        Bookshelves
      </Link>
      <button
        type="button"
        className="logout-button"
        onClick={this.onClickingLogout}
      >
        Logout
      </button>
      <AiFillCloseCircle
        className="close-icon"
        onClick={this.onClickingCloseIcon}
      />
    </div>
  )

  renderMobileNavBar = () => {
    const {isMenuShow} = this.state

    return (
      <>
        <nav className="mobile-nav-header">
          <div className="website-logo-container">
            <img
              src="https://res.cloudinary.com/djugcf64d/image/upload/v1680943074/Group_7730_moxigd.png"
              className="nav-website-logo"
              alt="website logo"
            />
            <p className="text">OOK HUB</p>
          </div>
          <GiHamburgerMenu
            className="menu-icon"
            onClick={this.onClickingMenuBar}
          />
        </nav>
        {isMenuShow ? this.renderNavitemsContainer() : null}
      </>
    )
  }

  renderLargeScreenNavBar = () => (
    <nav className="large-screen-nav-header">
      <div className="lg-website-logo-container">
        <img
          src="https://res.cloudinary.com/djugcf64d/image/upload/v1680943074/Group_7730_moxigd.png"
          className="nav-website-logo"
          alt="website logo"
        />
        <p className="lg-text">OOK HUB</p>
      </div>

      <div className="lg-nav-items-container">
        <Link to="/" className="lg-nav-item">
          Home
        </Link>
        <Link to="/bookshelves" className="lg-nav-item">
          Bookshelves
        </Link>
        <button
          type="button"
          className="lg-logout-button"
          onClick={this.onClickingLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )

  render() {
    const {isMenuShow} = this.state
    console.log(isMenuShow)

    return (
      <>
        {this.renderMobileNavBar()}
        {this.renderLargeScreenNavBar()}
      </>
    )
  }
}

export default withRouter(Header)
