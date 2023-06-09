import { useRouter } from "next/router";

import { UseUser } from "@/hooks/User";
import { useEffect } from "react";
import FullPageLoader from "../FullPageLoader/FullPageLoader";

export default function PrivateRoute({ protectedRoutes, children }) {
  const router = useRouter();
  const { user, loading } = UseUser();

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (!loading && !user && pathIsProtected) {
      router.push("/auth/signin");
    }
  }, [loading, user, pathIsProtected]);

  if ((loading || !user) && pathIsProtected) {
    return <FullPageLoader />;
  }

  return children;
}
