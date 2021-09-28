import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

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

class Jobs extends Component {
  state = {
    jobsData: [],
    searchInput: '',
    employmentTypeId: '',
    activeSalaryRangeId: '',
    activeEmpTypeId: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
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
      })
      console.log(updatedData)
    }
  }

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
  }

  onSearch = () => {
    this.getJobsData()
  }

  renderJobsList = () => {
    const {jobsData} = this.state
    const {searchInput} = this.state

    return (
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
        <div>
          <ul>
            {jobsData.map(each => (
              <JobsCard jobDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  onClickBsIcon = () => {
    this.getJobsData()
  }

  render() {
    return (
      <div className="jobs">
        <Header />
        <div className="jobs-container">
          <div className="pro-container">
            <div className="profile">
              <h1 className="pro-heading">RAHUL ATTLURI</h1>
              <p className="pro-para">
                {' '}
                Lead Software Developer and AI-ML expert
              </p>
            </div>
            <ul>
              <FilteredItems
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                onChangeSalary={this.onChangeSalary}
                onChangeEmpId={this.onChangeEmpId}
              />
            </ul>
          </div>
          <div>{this.renderJobsList()}</div>
        </div>
      </div>
    )
  }
}

export default Jobs
