"use client"
import Login from "@/components/Modal/Login/Login"
import { open } from "@/lib/store/features/modals/modal"
import { useAppDispatch } from "@/lib/store/hook"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginBtn() {
    const dispatch = useAppDispatch();
    const {data : session} = useSession() as any;
    const router = useRouter();

    const onLoginHandler = ()=>{

      if(session && !session.accessToken){
        return router.push('/signup');
      }

      dispatch(open({Component : Login}))
    }

  return (
    <button className="flex items-center justify-center w-[74px] h-[35px] bg-primary text-white text-base font-semibold rounded cursor-pointer" onClick={onLoginHandler}>로그인</button>
  )
  
}
