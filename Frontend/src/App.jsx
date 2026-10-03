import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import api from "../utils/axios.js";

function App() {
  const handleLogin = async (token) => {
    try {
      const response = await api.post("/auth/login", {
        token: token,
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
      // Sign in with Google
      const data = await signInWithPopup(auth, googleProvider);

      // Get Firebase ID token
      const token = await data.user.getIdToken();

      console.log("Token:", token);

      // Send token to backend
      await handleLogin(token);

      console.log("Google User:", data.user);
    } catch (error) {
      console.error("Google Login Failed:", error);
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