import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const termsAccepted = event.target.terms.checked;
    console.log("Form submitted", email, password, termsAccepted);

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{6,}$/;
    const casePattern = /[a-z]/;
    if (!passwordRegex.test(password)) {
      console.log("Password does not meet criteria");
      setError(
        "Password must be at least 6 characters long, contain at least one uppercase letter and one special character."
      );
      return;
    } else if (!casePattern.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }
    if (!termsAccepted) {
      setError("You must accept the Terms & Conditions to register.");
      return;
    }

    //reset status: succes / error message
    setError("");
    setSuccess(false);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User registered:", userCredential.user);
        setSuccess(true);
        event.target.reset();
      })
      .catch((error) => {
        console.log("Error during registration:", error);
        setError(error.message);
      });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left"></div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h2 className="text-3xl m-auto font-bold">Register now!</h2>
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <div className="relative ">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="password"
                    placeholder="password"
                  />
                  <button
                    onClick={handleTogglePassword}
                    className="btn btn-xs absolute top-2 right-5"
                  >
                    {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                  </button>
                </div>
                <label className="label">
                  <input type="checkbox" name="terms" className="checkbox" />
                  Accept Terms & Conditions
                </label>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {success && (
                <p className="text-green-700 mt-2">
                  User registered successfully!
                </p>
              )}
              {error && <p className="text-red-700 mt-2">{error}</p>}
            </form>
            <p>
              Already have an account? Please{" "}
              <Link className="text-blue-600 underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
