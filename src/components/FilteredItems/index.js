import './index.css'

const FilteredItems = props => {
  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(each => {
      const {onChangeSalary} = props

      const onChangeRadio = event => {
        onChangeSalary(event)
      }

      return (
        <li className="list-fil">
          <input
            value={each.salaryRangeId}
            onChange={onChangeRadio}
            type="radio"
            name="radio"
          />
          <label className="label">{each.label}</label>
        </li>
      )
    })
  }

  const renderEmployTypeList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(each => {
      const {onChangeEmpId} = props
      const onChangeCheckBox = event => {
        onChangeEmpId(event)
      }

      return (
        <li className="list-fil">
          <input
            value={each.employmentTypeId}
            onChange={onChangeCheckBox}
            type="checkbox"
          />
          <label selected className="label">
            {each.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div>
      <div>
        <h1 className="heading-type">Employment Type</h1>
        <ul className="ul-empy">{renderEmployTypeList()}</ul>
      </div>
      <div>
        <h1 className="heading-type">Salary Range</h1>
        <ul>{renderSalaryRangeList()}</ul>
      </div>
    </div>
  )
}

export default FilteredItems
