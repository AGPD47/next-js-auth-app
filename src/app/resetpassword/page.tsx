"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { url } from "inspector";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !token) {
      toast.error("Missing token or password");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/api/users/resetpassword", {
        token,
        newPassword,
      });
      toast.success("Password reset successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.error || "Reset failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form
        onSubmit={handleResetPassword}
        className="w-full max-w-sm bg-black p-6 rounded-lg shadow-lg"
      >
        <label
          htmlFor="newPassword"
          className="w-full mb-2 text-sm font-medium text-gray-300"
        >
          Enter new password
        </label>
        <input
          type="password"
          id="newPassword"
          className="w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-700  text-white placeholder-gray-400 focus:border-blue-500"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Resetting... " : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
