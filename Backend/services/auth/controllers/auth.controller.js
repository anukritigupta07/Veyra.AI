import  {getAuth} from "firebase-admin/auth";
import  {app} from "../../config/firebase.js";


export const login = async (req, res) => {
    try {
        const {token} = req.body;
        const decodedToken = await getAuth(app).verifyIdToken(token);
        const user = await User.findOne({ firebaseUid: decoded.uid });
       
      if (!user) {
        user = await User.create({
            firebaseUid: decoded.uid,
            name: decoded.name,
            email: decoded.email,
    } )}}
    catch (error) {
        console.error("Error occurred while verifying token:", error);
        return res.status(401).json({ error: "Invalid token" });
    }
}