"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "../utils/auth.ts";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn()) {
        router.replace("/login");
      }
    }, []);

    return isLoggedIn() ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
