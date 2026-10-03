import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";

function App() {

  const handleLogin = async () => {
    try {
      const data = await api.post("/auth/login", token );
      console.log(data);

    }
catch (error) {
      console.error("Login Failed:", error);
    }


  }

  const googleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);
      const token = await data.user.getIdToken();
      console.log("Token:", token);
      await handleLogin(token);

      console.log(data);
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