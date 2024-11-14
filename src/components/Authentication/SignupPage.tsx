import { useState } from "react";
import { auth, googleProvider } from "../../../src/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./signupPage.css";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false); // true dla logowania, false dla rejestracji

  //obsłuży zarówno logowanie, jak i rejestrację przez Google. Firebase automatycznie rozpoznaje, czy użytkownik już istnieje
  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider); //auth - instancja autoryzacji firebase
      alert(
        isLogin
          ? "Zalogowano pomyślnie przez Google!"
          : "Zarejestrowano pomyślnie przez Google!"
      );
    } catch (error) {
      console.log("błąd przy autoryzacji przez google", error);
    }
  };

  const handleEmailAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Zalogowano przez e-mail!");
      } else if (isLogin === false)
        await createUserWithEmailAndPassword(auth, email, password);
      alert("Zarejestrowano przez e-mail!");
    } catch (error) {
      console.log("błąd przy autoryzacji przez email", error);
    }
  };

  return (
    <div className="signup-box">
      <img className="logo" src="images/logo192.png" alt="logo" />
      <span className="signup-title">
        {isLogin ? "Login" : "Create Account"}
      </span>
      <div className="form">
        <button className="signup-google-btn" onClick={handleGoogleAuth}>
          <img
            className="google-logo"
            src="icons/g-logo.png"
            alt="google-icon"
          />
          {isLogin ? "Login with Google" : "Signup with Google"}
        </button>
        <div className="box-or">
          <div className="line"></div>
          <div className="or-text">or</div>
          <div className="line"></div>
        </div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="example@mail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="•••••••••••"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="accept-btn" onClick={handleEmailAuth}>
          {isLogin ? "Log in with Email" : "Sign up with Email"}
        </button>
      </div>
      <div className="change-panel">
        <div>
          {isLogin ? "Do not have an account?" : "Already have an account?"}
        </div>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create Account" : "Log in"}
        </button>
      </div>
    </div>
  );
}
