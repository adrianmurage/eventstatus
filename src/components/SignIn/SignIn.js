import React, { useState } from "react";
import { loginUser } from "../../utils/db";
import FormInput from "../FormInput/FormInput";

function SignIn() {
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
      const loggedinUser = await loginUser(user.email, user.password);
      if (!loggedinUser.$id) throw Error();
      setUser({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      seterror("An error occured. Please try again later.");
    }
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1 className="text-2xl">Sign In</h1>
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
        <div className="form-control space-y-6 pb-10 pt-5">
          <button
            type="submit"
            className="btn capitalize"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
