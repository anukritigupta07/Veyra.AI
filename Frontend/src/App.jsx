
import {
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { useEffect } from "react";
import api from "../utils/axios.js";

function App() {
  const handleLogin = async (token) => {
    try {
      const response = await api.post("/auth/login", {
        token,
      });

      console.log("Backend response:", response.data);
    } catch (error) {
      console.error(
        "Login Failed:",
        error.response?.data || error.message
      );
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error(
        "Google Login Failed:",
        error.code,
        error.message
      );
    }
  };

  useEffect(() => {
    const checkGoogleLogin = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (result) {
          console.log("Google User:", result.user);

          const token = await result.user.getIdToken();

          console.log("Firebase ID token received");

          await handleLogin(token);
        }
      } catch (error) {
        console.error(
          "Redirect Login Failed:",
          error.code,
          error.message
        );
      }
    };

    checkGoogleLogin();
  }, []);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <button
        onClick={googleLogin}
        className="w-50 h-24 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Continue with Google
      </button>
    </div>
  );
}

export default App;
