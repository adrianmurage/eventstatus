import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { ID, account } from "../utils/appwrite";

const defaultState = {
  user: null,
  loading: true,
  error: null,
  logout: async () => {},
  signup: async () => {},
  login: async () => {},
};

const userContext = createContext(defaultState);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const loadAccount = async () => {
    try {
      const loadedAccount = await account.get();
      setUser(loadedAccount);
    } catch (error) {
      console.error(error);
      setError("failed to load user");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailSession(email, password);
      await loadAccount();
      router.push("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const signup = async (email, password) => {
    try {
      const session = await account.create(ID.unique(), email, password);
      setUser(session);
      await account.createEmailSession(email, password);
      router.push("/");
      return { error: null };
    } catch (error) {
      setError(error.message);
      return { error: error.message };
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    loadAccount();
  }, []);
  return (
    <userContext.Provider
      value={{ user, loading, error, logout, login, signup }}
    >
      {children}
    </userContext.Provider>
  );
};

export const UseUser = () => {
  const context = useContext(userContext);
  return context;
};
