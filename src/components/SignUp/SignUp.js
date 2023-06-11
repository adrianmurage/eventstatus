import { UseUser } from "@/hooks/User";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import FormInput from "../FormInput/FormInput";

function SignUp() {
  const { signup, error: authError } = UseUser();
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
      await signup(user.email, user.password);
    } catch (err) {
      seterror(err.message);
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
      {authError ? <ErrorMessage message={authError} /> : ""}
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
