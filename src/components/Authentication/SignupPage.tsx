import "./signupPage.css";

export default function SignupPage() {
  return (
    <div className="signup-box">
      <img className="logo" src="images/logo192.png" alt="logo" />
      <span className="signup-title">Create Account</span>
      <div className="form">
        <button className="signup-google-btn">
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
        <input type="email" placeholder="example@mail.com" />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="•••••••••••" />
        <button className="accept-btn">Sign up with Email</button>
      </div>
    </div>
  );
}
