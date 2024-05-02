import { Link } from 'react-router-dom'
import './card.scss'

function Card({item}){

  return (
    <div className='card'>
       <Link to={`/${item.id}`} className='imageContainer'>
        <img src={item.img} alt="" />
       </Link>
       <div className="textContainer">
        <h2 className='title'>
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className='address'>
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
       
       <div className="progressBarContainer">
        <progress value={item.participants} max={item.totalParticipants} className="progressBar" ></progress>
        <span>{item.participants} participants</span>
    </div>
    <div className="bottom">
      <div className="icons">
        <div className="icon">
          <img src="/save.png" alt="" />
        </div>
        <div className="icon">
          <img src="/chat.png" alt="" />
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Card