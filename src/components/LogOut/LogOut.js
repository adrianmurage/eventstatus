import { UseUser } from '@/hooks/User';
import Link from 'next/link';

function LogOut() {
  const { user, loading, logout } = UseUser();
  if (loading) return;
  // If user is not authenticated, display sign in button
  if (!loading && !user) {
    return (
      <Link href="/">
        <button className="btn inline-flex items-center px-4 py-2 mt-2 font-medium text-white transition duration-500 ease-in-out transform rounded-lg text-md md:mt-0 md:ml-4 bg-orange">
          Sign in
        </button>
      </Link>
    );
  }
  return (
    <div>
      <button className="btn btn-outline  capitalize" onClick={logout}>
        Sign Out
      </button>
    </div>
  );
}

export default LogOut;
