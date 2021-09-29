import {Component} from 'react'

import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import {GoLocation} from 'react-icons/go'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import SkillsImg from '../SkillImg'

import Header from '../Header'

import SimilarJobs from '../similarJobs'

import LifeAtWork from '../lifeatCompany'

import './index.css'

class SelectedJobDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    skillsData: [],
    atWork: [],
  }

  componentDidMount() {
    this.getJobData()
  }

  dataFormat = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,

    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getSkillDataFormat = each => ({
    imageUrl: each.image_url,
    name: each.name,
  })

  getDescription = data => ({
    description: data.description,
    imageUrl2: data.image_url,
  })

  getJobData = async () => {
    const {similarJobsData, jobData} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = this.dataFormat(fetchedData.job_details)

      const skillss = fetchedData.job_details.skills.map(each =>
        this.getSkillDataFormat(each),
      )

      const companyDes = [fetchedData.job_details.life_at_company].map(each =>
        this.getDescription(each),
      )

      const similarJobsUpdatedData = fetchedData.similar_jobs.map(each =>
        this.dataFormat(each),
      )

      this.setState({
        jobData: updatedData,
        similarJobsData: similarJobsUpdatedData,
        skillsData: skillss,
        atWork: companyDes,
      })

      console.log(updatedData)
      console.log(similarJobsUpdatedData)
      console.log(skillss)
      console.log(companyDes)
    }
  }

  renderJobsDetailsView = () => {}

  render() {
    const {jobData, similarJobsData, skillsData, atWork} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
    } = jobData

    const {imageUrl, name} = skillsData

    const {imageUrl2, description} = atWork

    return (
      <div className="container-job">
        <Header />
        <div>
          <div className="list-job1">
            <div className="img-title1">
              <img className="logo-img1" src={companyLogoUrl} />
              <div className="tit-rating1">
                <h1 className="title1">{title}</h1>
                <div className="rat-star1">
                  <BsFillStarFill className="star1" />
                  <p className="rating1">{rating}</p>
                </div>
              </div>
            </div>
            <div className="loc-emp-pack1">
              <div className="loc1">
                <GoLocation className="loc-icon1" />
                <p className="location1">{location}</p>
              </div>
              <div className="brief1">
                <BsFillBriefcaseFill className="brief-icon1" />
                <p className="emp-type1">{employmentType}</p>
              </div>
              <p className="pack1">{packagePerAnnum}</p>
            </div>
            <hr />
            <h1 className="des1">Description</h1>
            <p className="job-des1">{jobDescription}</p>
            <h1 className="skill-head">Skills</h1>
            <ul className="skill-ul">
              {skillsData.map(each => (
                <SkillsImg eachImg={each} key={each.name} />
              ))}
            </ul>
            <div>
              <h1 className="lif-heading">Life at Company</h1>
              <ul className="lif-ul">
                {atWork.map(each => (
                  <LifeAtWork details={each} key={each.description} />
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h1 className="simi-heading1">Similar Jobs</h1>
            <ul className="simi-ul">
              {similarJobsData.map(each => (
                <SimilarJobs eachSimi={each} key={each.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectedJobDetails
