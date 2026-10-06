import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import api from "../utils/axios.js";

function App() {

  const googleLogin = async () => {
    try {
      console.log("Starting Google login...");

      // 1. Google login
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      console.log(
        "Google User:",
        result.user.email
      );

      // 2. Get Firebase ID token
      const token = await result.user.getIdToken();

      console.log("Firebase ID token received");

      // 3. Send token to backend
      const response = await api.post(
        "/auth/login",
        {
          token,
        }
      );

      console.log(
        "Backend response:",
        response.data
      );

      alert("Login successful!");

    } catch (error) {

      console.error(
        "Google Login Failed:",
        error
      );

      console.error(
        "Backend error:",
        error.response?.data
      );
    }
  };


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