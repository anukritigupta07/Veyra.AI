import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import crypto from "crypto";
import User from "../models/user.model.js";
import redis from "../../../shared/redis/redis.js";

export const login = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Firebase token
    const decodedToken = await getAuth(app).verifyIdToken(token);

    // Find user in MongoDB
    let user = await User.findOne({
      firebaseUid: decodedToken.uid,
    });

    // If user doesn't exist, create user
    if (!user) {
      user = await User.create({
        firebaseUid: decodedToken.uid,
        name: decodedToken.name || "",
        email: decodedToken.email,
      });
    }

    // Create session ID
    const sessionId = crypto.randomUUID();
    await redis.set(`session:${sessionId}`, JSON.stringify({
      userId: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }), "EX", 7 * 24 * 60 * 60 *1000 );
    
    // Store session for 7 days

    

    // Store session cookie
    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user,
      sessionId,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;
    await redis.del(`session:${sessionId}`);
    res.clearCookie("session")

    return res.status(200).json({mesage: "Logout successful"});
  }
  catch (error) {
    console.error("LOGOUT ERROR:", error);
    return res.status(500).json({
      message: "Logout failed",
      $error: error.message,
    });
  }
}   