import './index.css'

const FilteredItems2 = props => {
  const {eachDetailss, onChangeEmpId} = props
  const {employmentTypeId, label} = eachDetailss

  const onChangeCheckBox = event => {
    onChangeEmpId(event)
  }

  return (
    <li className="list-fil">
      <input
        className="check"
        value={employmentTypeId}
        onChange={onChangeCheckBox}
        type="checkbox"
      />
      <label className="label">{label}</label>
    </li>
  )
}

export default FilteredItems2
