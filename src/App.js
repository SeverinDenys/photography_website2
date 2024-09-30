import { useEffect, useState, useRef } from "react";
import { db, storage } from "./db";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import DefaultImage from "./assets/uploading-icon-removebg.png";
import { upload } from "@testing-library/user-event/dist/upload";
// import {
//   getDownloadURL,
//   ref as storageRef,
//   uploadBytes,
// } from "firebase/storage";

import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(
    /[018]/g,
    (c) =>
      (
        +c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] &
          (15 >> (+c / 4)))
      ).toString(16)
  );
}

const getUserId = () => window.location.host.split(".")[0];

function App() {
  const [data, setData] = useState(null);
  // const [imageURL, setImageURL] = useState(null);

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

  // const handleImageUpload = (event) => {
  //   event.preventDefault();
  //   fileUploadRef.current.click();
  // };

  // const uploadImageDisplay = async () => {
  //   const uploadedFile = fileUploadRef.current.files[0];
  //   const cachedUrl = URL.createObjectURL(uploadedFile)
  //   setImgFile(cachedUrl)
  // }

  // //

  const uploadFile = (image) => {
    const storageRef = ref(storage, `files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            setData({...data, main_picture1: downloadURL});
          }
        );
      }
    );
  };

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
            <input
              label="Image"
              placeholder="Choose image"
              accept="image/png,image/jpeg"
              type="file"
              onChange={(e) => {
                // setImageUpload(e.target.files[0]);
                // console.log(e.target.files[0]);
                uploadFile(e.target.files[0]);
              }}
            />
          </div>
          <img src={data.main_picture1} alt="img" />
          <div>
            <button onClick={onSaveData}>Save</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
