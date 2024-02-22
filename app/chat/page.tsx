import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import Form from "../components/Form";

export default async function ChatHomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return (
    <div className="h-screen bg-gray-200 flex flex-col">
      <Form />
    </div>
  );
}
