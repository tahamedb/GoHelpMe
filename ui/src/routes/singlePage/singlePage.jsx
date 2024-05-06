import './singlePage.scss'
import Slider from "../../components/slider/Slider"
import {singlePostData, userData} from "../../lib/dummydata"
import Map from "../../components/map/Map"
import { useLoaderData } from 'react-router-dom'

function SinglePage(){
  const post = useLoaderData();
  console.log(post);
  return (
    <div className='singlePage'>
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images}></Slider>
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="progressBarContainer">
                    <progress value={post.participants} max={post.totalParticipants} className="progressBar" ></progress>
                    <span>{post.participants} participants</span>
                </div>
              </div>
              {/* <div className="user">
                  <img src={userData.img} alt="" />
                  <span>{userData.name}</span>
                  </div> */}
            </div>
            <div className="bottom" style={{paddingBottom:"20px"}}>
              {post.description}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="features"></div>
        <div className="wrapper">
          <p className="title">User Details</p>
          <div className="listVertical">
            <div className="feature">
            {/* <img src={userData.img} alt="" className='user'/> */}
            {/* <div className="featureText">
            <span>{userData.name}</span>
            {userData.badge && <img src={`/badge${userData.badge}.png`} alt={`${userData.badge} badge`} />}
        <div className="lastOnline">
          <img src="/clock .png" alt="" />
          <span>{userData.lastOnline}</span>
        </div>
            </div>
            </div> */}

          {/* </div>
          <p className="title">Post Details</p>
          <div className="listVertical">
          <div className="feature">
      <div className="featureText">
        <strong>Estimated Duration:</strong>
        <span>{singlePostData.estimatedDuration}</span>
      </div>
      <div className="featureText">
        <strong>Minimum Age Required:</strong>
        <span>{singlePostData.minAge}</span>
      </div>
      <div className="featureText">
        <strong>Start Date:</strong>
        <span>{singlePostData.startDate}</span>
      </div>
    </div> */}
          {/* </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[singlePostData]}></Map>
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button>
              <img src="/save.png" alt="" />
              Save the Post
            </button>
          </div> */}
        {/* </div>
    // </div> */} 
     <div className="features">
        <div className="wrapper">
          <p className="title">User details</p>
          <div className="listVertical">
            <div className="feature">
              <div className="user">
              <img src={post.user.img} alt="" />
              </div>
              
              <div className="featureText">

                <div className="userDetails">
                <span>{post.user.username}</span>
                {post.user.badge && <img src={`/${post.user.badge}.png`} alt="" />}
                
               
                
              </div>
              </div>
            </div>
            <div className="feature">
              <div className="clock">
              <img src="/clock.png" alt="" />
              </div>
              <div className="featureText clockText">
                <p>{post.user.lastOnline}</p>
                
              </div>
            </div>
            {/* <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div> */}
          </div>
          {/* <p className="title">Post Details</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>80 sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>2 beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>1 bathroom</span>
            </div>
          </div> */}
          <p className="title">Post Details</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/hourglass.png" alt="" />
              <div className="featureText">
                <span>Estimated Duration :  </span>
                <p>{post.volunteerPostDetail.estimatedTime}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/age.png" alt="" />
              <div className="featureText">
                <span>Min Age Required : </span>
                <p>{post.volunteerPostDetail.minAge}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/deadline.png" alt="" />
              <div className="featureText">
                <span>Start Date : </span>
                <p>{post.startDate}</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button>
              <img src="/save.png" alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default SinglePage