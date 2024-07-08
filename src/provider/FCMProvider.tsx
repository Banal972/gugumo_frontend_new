"use client"
import { app } from "@/lib/firebase";
import { setToken } from "@/lib/store/features/fcmtoken";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { getMessaging, getToken } from "firebase/messaging";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const subscribeFetch = async (session : any,fcmtoken : string)=>{
  if(!session || !fcmtoken) return;
  const response = await fetch('/back/api/v1/subscribe',{
    method : "POST",
    headers : {
      "Content-Type": "application/json",
      "Authorization" : session?.accessToken
    },
    body : JSON.stringify({"fcmToken" : fcmtoken})
  });
  if(!response.ok){
    throw new Error('에러');
  }
}

const onFcm = async (dispatch : any)=>{

  const permission = await Notification.requestPermission();
  if(permission !== "granted") return;

  const messaging = getMessaging(app);

  await getToken(messaging,{
    vapidKey : process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY
  })
  .then(currentToken=>{
    if(currentToken){
      console.log(currentToken);
      dispatch(setToken(currentToken));
    }else{
      console.log('오류');
    }
  })
  .catch(err=>{
    console.log(err);
  });

}

export default function FCMProvider({children} : {children : React.ReactNode}) {

  const {data : session} = useSession() as any;
  const fcmtoken = useAppSelector((state) => state.fcmtoken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onFcm(dispatch);
  }, [dispatch]);

  useEffect(()=>{
    subscribeFetch(session,fcmtoken);
  },[session,fcmtoken]);

  return (
    <>{children}</>
  )

}