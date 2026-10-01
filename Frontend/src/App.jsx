import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";

function App() {
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      console.log("Google Login Successful:", result.user);
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