import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {BsSearch} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Profile from '../profile'

import FilteredItems2 from '../FiltredItem2'
import FilteredItems1 from '../FilteredItem1'

import JobsCard from '../jobsCard'

import Header from '../Header'

import FilteredItems from '../FilteredItems'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    id: uuidv4(),
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    id: uuidv4(),
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    id: uuidv4(),
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    id: uuidv4(),
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
    id: uuidv4(),
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
    id: uuidv4(),
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
    id: uuidv4(),
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
    id: uuidv4(),
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  constructor() {
    super()
    this.state = {
      apiStatus: apiStatusConstants.initial,
      jobsData: [],
      search: '',
      employmentTypeId: '',
      activeSalaryRangeId: '',
      activeEmpTypeId: '',
      profileData: [],
      option: [],
    }
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

    const profileApiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const Data = [data.profile_details].map(each => ({
        name: each.name,
        profileImageUrl: each.profile_image_url,
        shortBio: each.short_bio,
      }))

      this.setState({
        profileData: Data,
        apiStatus: apiStatusConstants.success,
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
      search,
      employmentTypeId,
      activeSalaryRangeId,
      activeEmpTypeId,
      option,
    } = this.state

    /* employment_type=${activeEmpTypeId}&minimum_package=${activeSalaryRangeId}& */

    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${option.join(
      ',',
    )}&minimum_package=${activeSalaryRangeId}&search=${search}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobsApiUrl, options)
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
    }
    if (response.status === 400) {
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
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>

      <Link to="/jobs" className="link">
        <button className="nav-button">Retry</button>
      </Link>
    </div>
  )

  renderFailureViewButton = () => (
    <div>
      <Link to="/jobs">
        <button className="nav-button">Retry</button>
      </Link>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  onChangeSalary = event => {
    const {activeSalaryRangeId} = this.state
    this.setState({activeSalaryRangeId: event.target.value}, this.getJobsData)
  }

  onChangeEmpId = event => {
    // const {activeEmpTypeId} = this.state
    // this.setState({activeEmpTypeId: event.target.value}, this.getJobsData)
    const {option} = this.state
    console.log(event.target.checked)
    let array = []
    console.log(array)

    if (event.target.checked === true) {
      array = [event.target.value]
      this.setState(
        prev => ({
          option: [...prev.option, ...array],
        }),
        this.getJobsData,
      )
    }
    if (event.target.checked === false) {
      const newArray = option.filter(each => each !== event.target.value)
      this.setState(
        {
          option: [...newArray],
        },
        this.getJobsData,
      )
      console.log(option)
    }
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
          alt="no jobs"
          className="failure"
        />
        <h1 className="failure-text">No Jobs Found</h1>
        <p className="failure-description">
          We could not find any jobs. Try other filters
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

  renderProfileView = () => {
    const {profileData} = this.state
    return (
      <ul>
        {profileData.map(each => (
          <Profile eachDet={each} key={each.name} />
        ))}
      </ul>
    )
  }

  renderProfileJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureViewButton()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  /*
   <FilteredItems
                  employmentTypesList={employmentTypesList}
                  salaryRangesList={salaryRangesList}
                  onChangeSalary={this.onChangeSalary}
                  onChangeEmpId={this.onChangeEmpId}
                />
  */

  render() {
    const {search, profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <>
        <Header />
        <div className="jobs">
          <div className="jobs-container">
            <div className="pro-container">
              {this.renderProfileJobs()}
              <h1 className="heading-type">Type of Employment</h1>
              <ul className="filtered-items">
                {employmentTypesList.map(each => (
                  <FilteredItems2
                    onChangeEmpId={this.onChangeEmpId}
                    eachDetailss={each}
                    key={each.id}
                  />
                ))}
              </ul>
              <h1 className="heading-type">Salary Range</h1>
              <ul className="filtered-items">
                {salaryRangesList.map(each => (
                  <FilteredItems1
                    eachSalary={each}
                    onChangeSalary={this.onChangeSalary}
                    key={each.id}
                  />
                ))}
              </ul>
            </div>
            <div className="con-inp-card">
              <div className="input-search">
                <input
                  value={search}
                  onChange={this.onChangeSearch}
                  type="search"
                  className="search-input"
                  placeholder="search"
                />
                <div className="search-icon-container">
                  <button
                    onClick={this.onSearch}
                    testid="searchButton"
                    className="sear-button"
                  >
                    <BsSearch className="search-icon" />
                  </button>
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
