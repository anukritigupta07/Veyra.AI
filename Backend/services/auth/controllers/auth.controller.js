import  {getAuth} from "firebase-admin/auth";
import  {app} from "../config/firebase.js";


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
    } )}

    const sessionId= crypto.randomUID();


    res.cookie("session", sessionId, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7*24*60*60*1000, // 1 day
    });
    return res.status(200).json({ message: "Login successful", user, sessionId });
}
    catch (error) {
        return res.status(500).json({ message: "Login failed", error: error.message });
    }
}

