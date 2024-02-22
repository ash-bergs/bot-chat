import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function ChatHomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return <h1>HELLO FROM CHAT</h1>;
}
