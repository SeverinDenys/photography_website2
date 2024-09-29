import { useEffect, useState, useRef } from "react";
import { db } from "./db";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import DefaultImage from "./assets/uploading-icon-removebg.png";
import { upload } from "@testing-library/user-event/dist/upload";

const getUserId = () => window.location.host.split(".")[0];

function App() {
  const [data, setData] = useState(null);
  const [imgFile, setImgFile] = useState(DefaultImage);

  const fileUploadRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "general_info", getUserId());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setData(data);
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    fetchData();
  }, []);

  const onTitleChange = (e) => {
    setData({ ...data, about_me_title: e.target.value });
  };

  const onDescriptionChange = (e) => {
    setData({ ...data, about_me_description: e.target.value });
  };

  const onSubTitleChange = (e) => {
    setData({ ...data, about_me_sub_title: e.target.value });
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = async () => {
    const uploadedFile = fileUploadRef.current.files[0];
    const cachedUrl = URL.createObjectURL(uploadedFile)
    setImgFile(cachedUrl)
  }

  //


  const onSaveData = async () => {
    const docRef = doc(db, "general_info", getUserId());

    try {
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <h1>Admin</h1>
      {!!data && (
        <>
          <label htmlFor="">Title: </label>
          <div>
            <input
              type="text"
              value={data.about_me_title}
              onChange={onTitleChange}
            />
          </div>
          <label htmlFor="">Description: </label>
          <div>
            <textarea
              value={data.about_me_description}
              onChange={onDescriptionChange}
            />
          </div>
          <label htmlFor="">Sub_Title: </label>
          <div>
            <textarea
              value={data.about_me_sub_title}
              onChange={onSubTitleChange}
            />
          </div>
          <div>
            <h2>Add image:</h2>

            <button className="btnImg" onClick={handleImageUpload}>
              <img
                className="img"
                alt="defaultImg"
                src={DefaultImage}
              ></img>
            </button>

            <form id="form" encType="multipart/form-data">
              <input
                type="file"
                id="file"
                hidden
                ref={fileUploadRef}
                onChange={uploadImageDisplay}
              />
            </form>
          </div>

          <div>
            <button onClick={onSaveData}>Save</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
