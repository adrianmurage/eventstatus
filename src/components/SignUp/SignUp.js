import React, { useState } from "react";
import { createUser } from "../../utils/db";
import FormInput from "../FormInput/FormInput";

function SignUp() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, seterror] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newUser = await createUser(user.email, user.password);
      if (!newUser.$id) throw Error();
      setUser({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      seterror("An error occured during sign up. Please try again later.");
    }
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleConfirmPasswordChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setPasswordMatch(e.target.value === user.password);
  };
  return (
    <div>
      <h1 className="text-2xl">Sign up </h1>
      {error}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          handler={handleChange}
          value={user.email}
          name="email"
        />
        <FormInput
          label="Password"
          type="password"
          handler={handleChange}
          value={user.password}
          name="password"
        />
        <FormInput
          label="Confirm Password"
          type="password"
          handler={handleConfirmPasswordChange}
          value={user.confirmPassword}
          name="confirmPassword"
        />
        {!passwordMatch && (
          <small className="mt-1">Passwords do not match.</small>
        )}
        <div className="form-control space-y-6 pb-10 pt-5">
          <button
            type="submit"
            className="btn capitalize"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
