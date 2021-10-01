import {Redirect, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-bg">
        <div className="card-home">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs,salary information and
            company reviews.Find the job that fits your ability and potential
          </p>
          <Link to="/jobs" className="link">
            <button className="home-button">Find Jobs</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
