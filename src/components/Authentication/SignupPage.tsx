import { useState } from "react";
import { auth, googleProvider } from "../../../src/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "./signupPage.css";

interface signupPageProps {
  title: string;
}

export default function SignupPage({ title }: signupPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider); //auth - instancja autoryzacji firebase
      alert("Zarejestrowano pomyślnie przez Google!");
    } catch (error) {
      console.log("błąd przy logowaniu przez google", error);
    }
  };

  const handleEmailSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Zarejestrowano przez e-mail!");
    } catch (error) {
      console.log("błąd w logowaniu przez email", error);
    }
  };

  return (
    <div className="signup-box">
      <img className="logo" src="images/logo192.png" alt="logo" />
      <span className="signup-title">{title}</span>
      <div className="form">
        <button className="signup-google-btn" onClick={handleGoogleSignup}>
          <img
            className="google-logo"
            src="icons/g-logo.png"
            alt="google-icon"
          />
          Signup with Google
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
        <button className="accept-btn" onClick={handleEmailSignup}>
          Sign up with Email
        </button>
      </div>
    </div>
  );
}
