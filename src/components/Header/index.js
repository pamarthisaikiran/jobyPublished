import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bg">
      <div>
        <img
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </div>
      <ul className="ul-header">
        <li>
          <Link to="/">
            <h1 className="nav-heading">Home</h1>
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <h1 className="nav-heading">Jobs</h1>
          </Link>
        </li>
      </ul>
      <div>
        <button type="button" onClick={onClickLogOut} className="nav-button">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
