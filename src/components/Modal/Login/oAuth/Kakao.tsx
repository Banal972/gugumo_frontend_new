"use client"
import { signIn } from "next-auth/react"

export default function Kakao() {

  const onSignInHandler = async ()=>{
    await signIn('kakao',{callbackUrl : "/oauth-callback"});
  }

  return (
    <div onClick={onSignInHandler} className="size-[34px] rounded-full cursor-pointer bg-[url(/asset/image/modal/kakao.png)] bg-center bg-cover"></div>
  )
}
