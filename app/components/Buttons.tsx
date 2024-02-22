"use client";

import { signIn, signOut } from "next-auth/react";

export function Logout() {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center justify-center gap-2 rounded-lg bg-purple-400 px-8 py-3 text-center text-sm font-semibold text-white ring-purple-300 transition duration-100 hover:bg-purple-600 md:text-base"
    >
      Logout
    </button>
  );
}

// TODO: there's a lag when clicking login, create a loading indicator
export function NavLogin() {
  return (
    <button
      onClick={() => signIn("github")}
      className="flex items-center justify-center gap-2 rounded-lg bg-pink-500 px-8 py-3 text-center text-sm font-semibold text-white ring-pink-300 transition duration-100 hover:bg-pink-600 md:text-base"
    >
      Login
    </button>
  );
}

export function MainLogin() {
  return (
    <button
      onClick={() => signIn("github")}
      className="w-full flex items-center justify-center gap-2 rounded-lg bg-pink-500 px-8 py-3 text-center text-sm font-semibold text-white ring-pink-300 transition duration-100 hover:bg-pink-600 md:text-base"
    >
      Login with Github
    </button>
  );
}
