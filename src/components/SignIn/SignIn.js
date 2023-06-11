import { useRouter } from "next/router";
import { useState } from "react";
import { UseUser } from "../../hooks/User";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import FormInput from "../FormInput/FormInput";

function SignIn() {
  const router = useRouter();

  const { login, user: authenticatedUser, error: authError } = UseUser();

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, seterror] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(user.email, user.password);
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

  if (authenticatedUser) {
    router.push("/");
    return;
  }

  return (
    <div>
      <h1 className="text-2xl">Sign In</h1>
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
