import './index.css'

const LifeAtWork = props => {
  const {details} = props
  const {description, imageUrl2} = details

  return (
    <li className="lif-list">
      <div className="lif-container">
        <div>
          <p className="lif-description">{description}</p>
        </div>
        <div>
          <img alt="life at company" className="lif-img" src={imageUrl2} />
        </div>
      </div>
    </li>
  )
}

export default LifeAtWork
