"use client";
import { messaging } from "@/lib/firebase";
import { getToken, onMessage } from "firebase/messaging";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const subscribeFetch = async (session: any, fcmtoken: string) => {
  const response = await fetch("/back/api/v1/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: session?.accessToken,
    },
    body: JSON.stringify({ fcmToken: fcmtoken }),
  });
  if (!response.ok) {
    throw new Error("에러");
  }
  console.log("등록완료");
};

export default function FCMProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession() as any;

  const [token, setToken] = useState("");

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY,
      });
      setToken(token);
    } else {
      console.log("메세지 알림 거부");
    }

    // 메세지 수신되면 출력
    onMessage(messaging, (payload) => {
      const { notification } = payload;
      if (notification) {
        const { title, body } = notification;
        if (title && body) {
          new Notification(title, {
            body,
            icon: "/icons/android-icon-48x48.png",
          });
        }
      }
    });
  };

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (!session || !session.accessToken || token === "") return;
    subscribeFetch(session, token);
  }, [session, token]);

  return <>{children}</>;
}
