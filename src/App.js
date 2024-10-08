import { useEffect, useState, useRef } from "react";
import { db, storage } from "./db";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { uuidv4 } from "./utils";
import { getUserId } from "./utils";
import InputImg from "../src/components/inputImg";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { Typography, TextField, Button, Box } from "@mui/material";
import Header from "./components/header/Header";

uuidv4();

getUserId();

function App() {
  const [data, setData] = useState(null);

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

  const uploadFile = (image, fieldName) => {
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
            setData({ ...data, [fieldName]: downloadURL });
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
    <>
      <Header />
      <div className="container">
        <h1 className="adminTitle">Admin</h1>
        {!!data && (
          <>
            <div className="inputsContainer">
              <Typography
                variant="h5"
                component="label"
                htmlFor="title-input"
                gutterBottom
              >
                Title:{" "}
              </Typography>
              <div>
                <TextField
                  id="title-input"
                  fullWidth
                  variant="outlined"
                  value={data.about_me_title}
                  onChange={onTitleChange}
                  size="small"
                  type="text"
                />
              </div>
              <Typography
                variant="h5"
                component="label"
                htmlFor="title-description"
                gutterBottom
                style={{ marginTop: "20px" }}
              >
                Description:{" "}
              </Typography>
              <div>
                <TextField
                  id="title-description"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  type="text"
                  value={data.about_me_description}
                  onChange={onDescriptionChange}
                />
              </div>
              <Typography
                htmlFor="sub-title"
                variant="h5"
                component="label"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                Sub_Title:{" "}
              </Typography>
              <div>
                <TextField
                  variant="outlined"
                  size="medium"
                  id="sub-title"
                  value={data.about_me_sub_title}
                  onChange={onSubTitleChange}
                />
              </div>
              <img
                className="img"
                src={data.main_picture1}
                alt="main img"
              />
              <InputImg
                uploadFile={uploadFile}
                fieldName={"main_picture1"}
              />

              <img
                className="img"
                src={data.author_img}
                alt="author img"
              />
              <InputImg
                uploadFile={uploadFile}
                fieldName={"author_img"}
              />

              <div>
                <Button
                  sx={{ marginTop: "2rem", marginBottom: "2rem" }} // Inline margin using sx prop
                  onClick={onSaveData}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
