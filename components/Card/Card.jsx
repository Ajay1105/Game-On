import './index.css'
const Card = ({heading}) => {
  return (
      <div className="card">
        <img src="./stadium1.jpg"/>
        <div className="heading">{heading}</div>
      </div>
  )
}
export default Card