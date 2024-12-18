import express from "express"
import {doc, setDoc, updateDoc, arrayUnion, Timestamp} from 'firebase/firestore'
import { db } from "../utils/firebase";
import deviceUserMap from "../middleware/deviceUserMap";

const router = express.Router();

router.post("/sendData", deviceUserMap, async (req, res) => {
  try {
    const { sensorData } = req.body;
    const { userId } = req.body;

    const prediction = "to be implemented";

    const sensorDataId = new Date().toISOString()
    const timeStamp = Timestamp.now().toMillis().toString()

    const sensorDataRef = doc(db, 'sensorData', sensorDataId)
    await setDoc(sensorDataRef, {
        userId,
        ...sensorData,
        prediction,
        timeStamp
    })

    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
        sensorData: arrayUnion(`devices/${sensorDataId}`),
    })


    res.status(200).json({ message: "Data Stored Successfully", prediction });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", details: error.message });
  }
});
