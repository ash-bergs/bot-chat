"use server";
import { getServerSession } from "next-auth";
import prisma from "./lib/db";
import { authOptions } from "./lib/auth";

export async function postData(formData: FormData) {
  // server functions must always be marked as "use server"
  ("use server");

  const Pusher = require("pusher");

  const session = await getServerSession(authOptions);
  const message = formData.get("message");

  // create a new message in the database
  // npx prisma studio -> opens prisma studio to view records
  // useful for testing
  const data = await prisma.message.create({
    data: {
      message: message as string,
      email: session?.user?.email,
    },
    include: {
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  // create pusher event
  const pusher = new Pusher({
    id: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "us2",
    useTLS: true,
  });

  pusher.trigger("my-channel", "my-event", {
    message: `${JSON.stringify(data)}\n\n`,
  });
}
