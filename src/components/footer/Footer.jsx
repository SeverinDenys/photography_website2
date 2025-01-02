import { useEffect, useState } from "react";
import { getUserId } from "../../utils";
import { db } from "../../firebase";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { Typography, TextField, Button } from "@mui/material";
import Header from "../header/Header";

export default function Footer() {
  const [footerData, setFooterData] = useState(null);

  const fetchData = async () => {
    try {
      
      const docRef = doc(db, "footer", getUserId());  
      console.log("docRef", docRef);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFooterData(data);
        console.log("Fetched footer data:", data);
      } else {
        console.log("Footer document does not exist.");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onEmailChange = (e) => {
    setFooterData({
      ...footerData,
      footer_contact_me: {
        ...footerData.footer_contact_me,
        footer_email: e.target.value,
      },
    });
  };

  const onFooterPhoneChange = (e) => {
    setFooterData({
      ...footerData,
      footer_contact_me: {
        ...footerData.footer_contact_me,
        footer_phone: e.target.value,
      },
    });
  };

  const onFooterAddressChange = (e) => {
    setFooterData({
      ...footerData,
      footer_contact_me: {
        ...footerData.footer_contact_me,
        footer_address: e.target.value,
      },
    });
  };
  const onSaveData = async () => {
    

    const docRef = doc(db, "footer", getUserId());  

    try {
      await updateDoc(docRef, {
        footer_contact_me: footerData.footer_contact_me,
      });
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Error saving data");
    }
  };
  return (
    <>
      <Header />
      <div className="footer-container">
        {footerData ? (
          <div className="footer">
            <Typography
              variant="h5"
              component="label"
              htmlFor="footer-email"
              gutterBottom
              style={{ marginTop: "20px" }}
            >
              Footer-email:{" "}
            </Typography>
            <div>
              <TextField
                id="footer-email"
                fullWidth
                variant="outlined"
                size="medium"
                type="text"
                value={footerData.footer_contact_me.footer_email}
                onChange={onEmailChange}
              />
            </div>

            <Typography
              variant="h5"
              component="label"
              htmlFor="footer-phone"
              gutterBottom
              style={{ marginTop: "20px" }}
            >
              Footer-phone:{" "}
            </Typography>
            <div>
              <TextField
                id="footer-phone"
                fullWidth
                variant="outlined"
                size="medium"
                type="text"
                value={footerData.footer_contact_me.footer_phone}
                onChange={onFooterPhoneChange}
              />
            </div>

            <Typography
              variant="h5"
              component="label"
              htmlFor="footer-address"
              gutterBottom
              style={{ marginTop: "20px" }}
            >
              Footer-address:{" "}
            </Typography>
            <div>
              <TextField
                id="footer-address"
                fullWidth
                variant="outlined"
                size="medium"
                type="text"
                value={footerData.footer_contact_me.footer_address}
                onChange={onFooterAddressChange}
              />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
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
  );
}
