"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = async () => {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      await fetch("api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          console.log("success");
        } else {
          console.log("fail");
        }
        router.push("/");
      });
    };
    checkAuth();
  }, []);

  return <div> Loading ... </div>;
};

export default page;
