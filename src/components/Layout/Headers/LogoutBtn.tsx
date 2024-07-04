"use client"

import { signOut } from "next-auth/react"

export default function LogoutBtn() {
  return (
    <button type="button" onClick={()=>signOut({callbackUrl : "/"})} className="text-OnSurface">로그아웃</button>
  )
}
