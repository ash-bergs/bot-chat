import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./components/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import Image from "next/image";
import { Logout, NavLogin } from "./components/Buttons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bot Chat",
  description: "Chat with bots, or with people? Who knows?",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <nav className="flex px-10 py-5 justify-between fixed top-0 left-0 w-full bg-white">
            <h1 className="text-black text-3xl font-bold">
              Bot<span className="text-pink-500">Chat</span>
            </h1>

            {session ? (
              <div className="flex items-center">
                <Image
                  src={session.user?.image as string}
                  alt="user profile photo"
                  className="w-12 h-12 rounded-full mr-3"
                  width={50}
                  height={50}
                />
                <Logout />
              </div>
            ) : (
              <div>
                <NavLogin />
              </div>
            )}
          </nav>
          <main>{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
