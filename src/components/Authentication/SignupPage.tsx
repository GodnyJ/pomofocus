import "./signupPage.css";
import { registerUser, loginUser, getUsers } from "../../../api/auth.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      let data;
      if (isLogin) {
        data = await loginUser(email, password);
      } else {
        data = await registerUser(email, password);
      }

      // Zapisz token JWT w localStorage
      localStorage.setItem("token", data.accessToken);

      // Pobierz chronione dane użytkownika
      const token = data.accessToken;
      const users = await getUsers(token);
      console.log("Użytkownicy:", users);

      // Przekierowanie na stronę główną
      //   navigate("/");
    } catch (error) {
      console.error("Błąd podczas autoryzacji:", error);
    }
  };

  return (
    <div className="signup-box">
      <img className="logo" src="images/logo192.png" alt="logo" />
      <span className="signup-title">
        {isLogin ? "Login" : "Create Account"}
      </span>
      <div className="form">
        {/* <button className="signup-google-btn">
          <img
            className="google-logo"
            src="icons/g-logo.png"
            alt="google-icon"
          />
          {isLogin ? "Login with Google" : "Signup with Google"}
        </button> */}
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
        <button className="accept-btn" onClick={handleAuth}>
          {isLogin ? "Login with Email" : "Sign up with Email"}
        </button>
      </div>
    </div>
  );
}
