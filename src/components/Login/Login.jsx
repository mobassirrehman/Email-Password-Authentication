import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router";
import { auth } from "../../firebase/firebase.init";

const Login = () => {
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Login submitted", email, password);

    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User logged in:", userCredential.user);
      })
      .catch((error) => {
        console.log("Error during login:", error);
        setError(error.message);
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
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />
            <div>
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
