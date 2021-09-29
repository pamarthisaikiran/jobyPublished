import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Profile from '../profile'

import Cookies from 'js-cookie'

import JobsCard from '../jobsCard'

import Header from '../Header'

import FilteredItems from '../FilteredItems'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsData: [],
    searchInput: '',
    employmentTypeId: '',
    activeSalaryRangeId: '',
    activeEmpTypeId: '',
    profileData: [],
  }

  componentDidMount() {
    this.getJobsData()
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {profileData} = this.state

    const api = 'https://apis.ccbp.in/profile'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(api, options)
    if (response.ok) {
      const data = await response.json()
      const Data = [data.profile_details].map(each => ({
        name: each.name,
        profileImageUrl: each.profile_image_url,
        shortBio: each.short_bio,
      }))

      this.setState({
        profileData: Data,
      })
      console.log(Data)
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getJobsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {
      jobsData,
      searchInput,
      employmentTypeId,
      activeSalaryRangeId,
      activeEmpTypeId,
    } = this.state

    /* employment_type=${activeEmpTypeId}&minimum_package=${activeSalaryRangeId}& */

    const url = `https://apis.ccbp.in/jobs?employment_type=${
      (activeEmpTypeId, activeEmpTypeId)
    }&minimum_package=${activeSalaryRangeId}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedData)
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure"
      />
      <h1 className="failure-text">Oops!SomeThing Went Wrong</h1>
      <p className="failure-description">
        We can not seem to find the page you looking for
      </p>
      <button className="nav-button">Retry</button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value}, this.getJobsData)
  }

  onChangeSalary = event => {
    const {activeSalaryRangeId} = this.state
    this.setState({activeSalaryRangeId: event.target.value}, this.getJobsData)
  }

  onChangeEmpId = event => {
    const {activeEmpTypeId} = this.state
    this.setState({activeEmpTypeId: event.target.value}, this.getJobsData)
    console.log(activeEmpTypeId)
  }

  onSearch = () => {
    this.getJobsData()
  }

  renderJobsList = () => {
    const {jobsData} = this.state
    const {searchInput} = this.state
    const lengthOfJobList = jobsData.length > 0

    return lengthOfJobList ? (
      <div>
        <div>
          <ul className="card">
            {jobsData.map(each => (
              <JobsCard jobDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <div className="products-error-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure"
        />
        <h1 className="failure-text">No Jobs Found</h1>
        <p className="failure-description">
          We could not find any other jobs.Try other filters
        </p>
      </div>
    )
  }

  onClickBsIcon = () => {
    this.getJobsData()
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <>
        <Header />
        <div className="jobs">
          <div className="jobs-container">
            <div className="pro-container">
              <ul>
                {profileData.map(each => (
                  <Profile eachDet={each} key={each.name} />
                ))}
              </ul>
              <ul className="filtered-items">
                <FilteredItems
                  employmentTypesList={employmentTypesList}
                  salaryRangesList={salaryRangesList}
                  onChangeSalary={this.onChangeSalary}
                  onChangeEmpId={this.onChangeEmpId}
                />
              </ul>
            </div>
            <div>
              <div className="input-search">
                <input
                  value={searchInput}
                  onChange={this.onChangeSearch}
                  type="search"
                  className="search-input"
                  placeholder="search"
                />
                <div className="search-icon-container">
                  <BsSearch onClick={this.onSearch} className="search-icon" />
                </div>
              </div>
              {this.renderAllJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
