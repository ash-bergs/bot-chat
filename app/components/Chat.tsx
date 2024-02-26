"use client";

import Image from "next/image";
import { useState } from "react";

// revisit this type
interface iAppProps {
  data: {
    User: {
      image: string | null;
      name: string | null;
    } | null;
    message: string;
  }[];
}

export default function Chat({ data }: iAppProps) {
  const [totalMessages, setTotalMessages] = useState(data);

  return (
    <div className="p-6 flex-grow max-h-screen overflow-y-auto py-32">
      <div className="flex flex-col gap-4">
        {totalMessages.map((message, index) => (
          <div key={index}>
            <div className="flex items-center">
              <Image
                src={message.User?.image as string}
                alt="Profile image of sender"
                className="w-12 h-12 object-cover rounded-lg mr-4"
                width={50}
                height={50}
              />
              <p className="rounded-lg bg-white p-4 shadow-md self-start">
                {message.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
