import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import {GoLocation} from 'react-icons/go'

import './index.css'

const SimilarJobs = props => {
  const {eachSimi} = props
  const {
    companyLogoUrl,
    title,
    id,
    jobDescription,
    rating,
    location,
    employmentType,
  } = eachSimi

  return (
    <li className="simi-list">
      <div>
        <div className="simi-card">
          <img alt="similar job company logo" src={companyLogoUrl} />
          <div className="head-rat-star">
            <h1 className="simi-heading">{title}</h1>
            <div className="simi-star-rat">
              <BsFillStarFill className="simi-star" />
              <p className="simi-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="simi-heading">Description</h1>
          <p className="simi-description">{jobDescription}</p>
          <div className="all">
            <div className="simi-nav-loc">
              <GoLocation className="simi-nav" />
              <p className="simi-location">{location}</p>
            </div>
            <div className="simi-box-emp">
              <BsFillBriefcaseFill className="simi-box" />
              <p className="simi-emp">{employmentType}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
