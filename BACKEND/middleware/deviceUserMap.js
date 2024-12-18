import { db } from "../utils/firebase"
import jwt from 'jsonwebtoken'

const deviceUserMap = async (req, res, next) => {
    try {
        const authHeader = req.header.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({error: "Authorization token missing or invalid"})
        }

        const token = authHeader.split(' ')[1]
        const {deviceId} = jwt.decode(token);

        const deviceDoc = await db.collection('devices').doc(deviceId).get()
        if (!deviceDoc){
            return res.status(404).json({error: 'Device not registered'})
        } 

        const { secretKey, userId } = deviceDoc.data()

        try {
            jwt.verify(token, secretKey, {algorithms:['HS256']})
        } catch (error) {
            return res.status(403).json({error:'Invalid or expired token'})
        }

        req.userId =  userId;
        next();

    } catch (error) {
        res.status(500).json({error: "Internal Server Error", details: error.message})
    }
}

export default deviceUserMap