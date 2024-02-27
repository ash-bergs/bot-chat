"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";

interface iAppProps {
  data: {
    User: {
      image: string | null;
      name: string | null;
    };
    message: string;
  }[];
}

export default function ChatComponent({ data }: iAppProps) {
  const [totalComments, setTotalComments] = useState(data);
  const messageEndRef = useRef<HTMLInputElement>(null);

  // TODO: this isn't running as expected
  // debug
  /** 
   * Just noticed:
   *   name: 'PusherRequestError',
  message: 'Unexpected status code 400',
  url: 'https://api-us2.pusher.com/apps/undefined/events?auth_key=a7d02a40bf8bfa0df575&auth_timestamp=1709012537&auth_version=1.0&body_md5=4fdef5b68f18534321f0883395bd6742&auth_signature=48d2a569d6bcf4dd8db23e774eb61784c9f24528fd244b2c7d62408553a7f839',
  error: undefined,
  status: 400,
  body: 'Token validated, but invalid for app undefined\n'
   */
  useEffect(() => {
    console.log("useEffect run one");
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: "us2",
    });
    console.log("useEffect run two");
    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (data: any) {
      const parsedComments = JSON.parse(data.message);
      console.log(parsedComments);

      setTotalComments((prev) => [...prev, parsedComments]);
    });

    return () => {
      pusher.unsubscribe("my-channel");
    };
  }, []);

  const scrollTobottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollTobottom();
  }, [totalComments]);

  return (
    <div className="p-6 flex-grow max-h-screen overflow-y-auto py-32">
      <div className="flex flex-col gap-4">
        {totalComments.map((message, index) => (
          <div key={index}>
            <div className="flex items-center">
              <Image
                src={message.User.image as string}
                alt="Profile image of user"
                className="w-12 h-12 object-cover rounded-lg mr-4"
                width={50}
                height={50}
              />
              <div className="rounded-lg bg-white p-4 shadow-md self-start">
                {message.message}
              </div>
            </div>

            <p className="font-light text-sm text-gray-600">
              {message.User.name}
            </p>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
}
