import './index.css'

const Profile = props => {
  const {eachDet} = props
  const {profileImageUrl, name, shortBio} = eachDet
  return (
    <li className="profile">
      <img alt="profile" src={profileImageUrl} />
      <h1 className="pro-heading">{name}</h1>
      <p className="pro-para"> {shortBio}</p>
    </li>
  )
}

export default Profile
