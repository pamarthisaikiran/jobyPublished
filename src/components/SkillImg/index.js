import './index.css'

const SkillsImg = props => {
  const {eachImg} = props
  const {imageUrl, name} = eachImg

  return (
    <li>
      <img src={imageUrl} />
      <p>{name}</p>
    </li>
  )
}

export default SkillsImg
