import { useEffect, useState } from "react";
import { db } from "./db";
import { getDoc, updateDoc, doc } from "firebase/firestore";

const getUserId = () => window.location.host.split('.')[0];

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "test", getUserId());
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

    const onTitleChange = e => {
        setData({...data, title: e.target.value })
    }

    const onDescriptionChange = e => {
        setData({...data, description: e.target.value })
    }

    const onSaveData = async () => {
        const docRef = doc(db, "test", getUserId());

        try {
            await updateDoc(docRef, data);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }

      return (
          <div>
              <h1>Admin</h1>
              {
                  !!data && (
                      <>
                          <div>
                              <input type="text" value={data.title} onChange={onTitleChange}/>
                          </div>
                          <div>
                              <textarea value={data.description} onChange={onDescriptionChange}/>
                          </div>
                          <div>
                              <button onClick={onSaveData}>Save</button>
                          </div>
                      </>

                  )
              }
          </div>
      );
}

export default App;
