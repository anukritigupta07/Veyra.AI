import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase.js";
import api from "../../utils/axios.js";


function Home() {
  const googleLogin = async () => {
    try {
      console.log("Starting Google login...");

      // 1. Google login
      const result = await signInWithPopup(auth, googleProvider);

      console.log("Google User:", result.user.email);

      // 2. Get Firebase ID token
      const token = await result.user.getIdToken();

      console.log("Firebase ID token received");

      // 3. Send token to backend
      const response = await api.post("/auth/login", { token });

      console.log("Backend response:", response.data);

      alert("Login successful!");
    } catch (error) {
      console.error("Google Login Failed:", error);
      console.error("Backend error:", error.response?.data);
    }
  };

  return (
    <div className='h-screen  flex bg-[#0d0f14] text-white overflow-hidden'></div>
  );
}

export default Home;
