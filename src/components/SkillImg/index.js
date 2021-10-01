import './index.css'

const SkillsImg = props => {
  const {eachImg} = props
  const {imageUrl, name} = eachImg

  return (
    <li className="skills-li">
      <img alt={name} className="li-ski-img" src={imageUrl} />
      <p className="li-ski-para">{name}</p>
    </li>
  )
}

export default SkillsImg
