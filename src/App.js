import { useEffect, useState, useRef } from "react";
import { db, storage } from "./firebase";
import { getDoc, updateDoc, doc } from "firebase/firestore";

import { getUserId } from "./utils";
import InputImg from "../src/components/inputImg";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { Typography, TextField, Button, Box } from "@mui/material";
import Header from "./components/header/Header";
import { useNavigate, useSearchParams } from "react-router-dom";

function App() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const email = searchParams.get("email");
    if (email) {
      localStorage.setItem("user", JSON.stringify({ email }));
    }
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "http://localhost:3000/signIn";
    }

    const fetchData = async () => {
      try {
        const docRef = doc(db, "general_info", getUserId());
        console.log("docRef", docRef);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setData(data);
          console.log("data", data);
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    if (getUserId()) {
      fetchData();
    } else {
      navigate("/signIn");
    }
  }, [navigate, searchParams]);

  const onTitleChange = (e) => {
    setData({ ...data, about_me_title: e.target.value });
  };

  const onSubTitleChange = (e) => {
    setData({ ...data, about_me_sub_title: e.target.value });
  };

  const onMainDescriptionChange = (e) => {
    setData({ ...data, main_description_title: e.target.value });
  };

  const onDescriptionChange = (e) => {
    setData({ ...data, about_me_description: e.target.value });
  };

  const onAuthorTitleChange = (e) => {
    setData({
      ...data,
      author: {
        ...data.author,
        author_title: e.target.value,
      },
    });
  };

  const onAuthorSubTitleChange = (e) => {
    setData({
      ...data,
      author: {
        ...data.author,
        author_subTitle: e.target.value,
      },
    });
  };

  const onAuthorDescription1Change = (e) => {
    setData({
      ...data,
      author: {
        ...data.author,
        author_description1: e.target.value,
      },
    });
  };

  const onAuthorDescription2Change = (e) => {
    setData({
      ...data,
      author: {
        ...data.author,
        author_description2: e.target.value,
      },
    });
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
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Error saving data");
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
                Description Title:{" "}
              </Typography>
              <div>
                <TextField
                  id="main-title-description"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  type="text"
                  value={data.main_description_title}
                  onChange={onMainDescriptionChange}
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

              <h1>Main Picture</h1>

              {data.main_picture1 && (
                <img
                  className="img"
                  src={data.main_picture1}
                  alt="main img"
                />
              )}
              <InputImg
                uploadFile={uploadFile}
                fieldName={"main_picture1"}
              />

              <Typography
                variant="h5"
                component="label"
                htmlFor="title-description"
                gutterBottom
                style={{ marginTop: "20px" }}
              >
                Author Title:{" "}
              </Typography>
              <div>
                <TextField
                  id="title-description"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  type="text"
                  value={data.author.author_title}
                  onChange={onAuthorTitleChange}
                />
              </div>

              <Typography
                variant="h5"
                component="label"
                htmlFor="title-description"
                gutterBottom
                style={{ marginTop: "20px" }}
              >
                Author subTitle:{" "}
              </Typography>
              <div>
                <TextField
                  id="title-description"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  type="text"
                  value={data.author.author_subTitle}
                  onChange={onAuthorSubTitleChange}
                />
              </div>

              <Typography
                variant="h5"
                component="label"
                htmlFor="title-description"
                gutterBottom
                style={{ marginTop: "20px" }}
              >
                Author Description1:{" "}
              </Typography>
              <div>
                <TextField
                  id="title-description"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  type="text"
                  value={data.author.author_description1}
                  onChange={onAuthorDescription1Change}
                />
              </div>

              <Typography
                variant="h5"
                component="label"
                htmlFor="title-description"
                gutterBottom
                style={{ marginTop: "20px" }}
              >
                Author Description2:{" "}
              </Typography>
              <div>
                <TextField
                  id="title-description"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  type="text"
                  value={data.author.author_description2}
                  onChange={onAuthorDescription2Change}
                />
              </div>

              <h1>Author Img</h1>
              {data.author_img && (
                <img
                  className="img"
                  src={data.author_img}
                  alt="author img"
                />
              )}

              <InputImg
                uploadFile={uploadFile}
                fieldName={"author_img"}
              />
              <div>
                <Button
                  sx={{ marginTop: "2rem", marginBottom: "2rem" }}
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
