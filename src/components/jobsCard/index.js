import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import {GoLocation} from 'react-icons/go'

import './index.css'

const JobsCard = props => {
  const {jobDetails} = props
  const {
    title,
    rating,
    packagePerAnnum,
    location,
    jobDescription,
    employmentType,
    companyLogoUrl,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="list-job">
        <div className="img-title">
          <img className="logo-img" src={companyLogoUrl} />
          <div className="tit-rating">
            <h1 className="title">{title}</h1>
            <div className="rat-star">
              <BsFillStarFill className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="loc-emp-pack">
          <div className="loc">
            <GoLocation className="loc-icon" />
            <p className="location">{location}</p>
          </div>
          <div className="brief">
            <BsFillBriefcaseFill className="brief-icon" />
            <p className="emp-type">{employmentType}</p>
          </div>
          <p className="pack">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="des">Description</h1>
        <p className="job-des">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard
