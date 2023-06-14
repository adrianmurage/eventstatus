import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { UserProvider } from "../hooks/User";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const protectedRoutes = ["/newEvent"];
  return (
    <UserProvider>
      <ProtectedRoute protectedRoutes={protectedRoutes}>
        <Component {...pageProps} />
      </ProtectedRoute>
    </UserProvider>
  );
}

export default MyApp;
