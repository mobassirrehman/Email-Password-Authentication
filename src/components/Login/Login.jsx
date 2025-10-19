import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link } from "react-router";
import { auth } from "../../firebase/firebase.init";

const Login = () => {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Login submitted", email, password);

    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User logged in:", userCredential.user);
        if (!userCredential.user.emailVerified) {
          alert("Please verify your email before logging in.");
        }
      })
      .catch((error) => {
        console.log("Error during login:", error);
        setError(error.message);
      });
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked", emailRef.current.value);
    const email = emailRef.current.value;
    if (!email) {
      alert("Please enter your email address to reset your password.");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent. Please check your inbox.");
      })
      .catch((error) => {
        console.log("Error sending password reset email:", error);
      });
  };
  return (
    <div className="card bg-base-100 mt-6 w-full max-w-sm m-auto shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="text-3xl m-auto font-bold">Login now!</h2>
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              ref={emailRef}
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />
            <div onClick={handleForgotPassword}>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>
        {error && <p className="text-red-600 mt-4">{error}</p>}
        <p>
          First time here? Please{" "}
          <Link className="text-blue-600 underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
