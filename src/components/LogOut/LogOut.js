import { UseUser } from "@/hooks/User";
import Link from "next/link";

function LogOut() {
  const { user, loading, logout } = UseUser();
  if (loading) return;
  // If user is not authenticated, display sign in button
  if (!loading && !user) {
    return (
      <Link href="/auth/signin">
        <button className="btn">Sign in</button>
      </Link>
    );
  }
  return (
    <div>
      <button className="btn" onClick={logout}>
        Sign Out
      </button>
    </div>
  );
}

export default LogOut;
