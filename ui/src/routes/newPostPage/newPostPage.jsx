import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
// import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/uploadWidget";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
          title: inputs.title,
          description: value,
          startDate: new Date(inputs.startDate),
          endDate: inputs.endDate ? new Date(inputs.endDate) : null,
          category: inputs.category,
          city: inputs.city,
          country: inputs.country,
          address: inputs.address,
          images: images,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          requiredParticipants: parseInt(inputs.requiredParticipants),
          volunteerPostDetail: {
            minAge: parseInt(inputs.minAge),
            estimatedTime: parseInt(inputs.estimatedTime),
        }
      });
      navigate("/"+res.data.id)
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="startDate">Start date</label>
              <input id="startDate" name="startDate" type="date" />
            </div>
            <div className="item">
              <label htmlFor="endDate">End date</label>
              <input id="endDate" name="endDate" type="date" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="category">Category</label>
              <input id="category" name="category" type="text" />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="country">Country</label>
              <input id="country" name="country" type="text" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="requiredParticipants">Required participants</label>
              <input min={1} id="requiredParticipants" name="requiredParticipants" type="number" />
            </div>
            <div className="item">
              <label htmlFor="minAge">Minimum age</label>
              <input id="minAge" name="minAge" type="number" />
            </div>
            <div className="item">
              <label htmlFor="estimatedTime">Estimated time (h)</label>
              <input id="estimatedTime" name="estimatedTime" type="number" />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;