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
  // console log with lots of emojis
  console.log(
    "🚀 ~ file: action.ts ~ line 30 ~ env ~ app id",
    process.env.NEXT_PUBLIC_PUSHER_APP_ID
  );

  // create pusher event
  const pusher = new Pusher({
    appId: "1762055",
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "us2",
    useTLS: true,
  });

  pusher.trigger("my-channel", "chat-event", {
    message: `${JSON.stringify(data)}\n\n`,
  });
}
