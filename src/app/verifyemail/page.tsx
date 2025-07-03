"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      if (error.response) {
        console.log("Backend responded with error:", error.response.data);
        setErrorMsg(error.response.data?.message || "Backend error");
      } else if (error.request) {
        console.log("No response received:", error.request);
        setErrorMsg("No response from server");
      } else {
        console.log("Error setting up request:", error.message);
        setErrorMsg("Client error: " + error.message);
      }
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl ">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error: {errorMsg}</h2>
        </div>
      )}
    </div>
  );
}
