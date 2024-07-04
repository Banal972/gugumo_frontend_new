"use client"
import Kakao from "@/components/Modal/Login/oAuth/Kakao";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Login({isOpen,onClose} : {isOpen : boolean,onClose : any}) {

    const {register,handleSubmit} = useForm();
    const router = useRouter();
    const [active,setActive] = useState(false);

    const onSubmit = async (event : any)=>{

      const {username,password} = event;
  
      if(username === ""){
        return alert('이메일을 입력해주세요.');
      }
  
      if(password === ""){
        return alert('비밀번호을 입력해주세요.');
      }
  
      const res = await signIn('credentials',{
        username : username,
        password : password,
        redirect: false,
      });
  
      if(res?.ok){
        router.push('/');
        return onClose();
      }else{
        alert('로그인에 실패 하였습니다.');
      }
    
    }

    useEffect(()=>{
        const html = document.querySelector('html');
        if(!html) return;
        if(isOpen){
          html.style.overflowY = "hidden";
        }
        setTimeout(() => {
          setActive(true);
        }, 200);
    },[isOpen]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-[rgba(000,000,000,0.6)]">
      <div className="z-50 w-[90%] max-w-[422px] fixed overflow-visible top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-9 px-8 md:px-16 box-border rounded-xl">
          <button type="button" className="absolute right-4 top-5 cursor-pointer" onClick={onClose}>
              <Image src="/asset/image/icon/close.svg" alt="취소버튼" width={24} height={24} />
          </button>
          <div className="w-[115.66px] mx-auto">
              <Image src="/asset/image/modal/login-simbol.png" alt="로고 아이콘" width={523} height={458}/>
          </div>
          <h5 className="font-semibold text-lg text-center text-primary mt-10">로그인</h5>
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
              <input 
                type="text" 
                placeholder='이메일을 입력해주세요.' 
                className="h-9 md:h-11 rounded-lg border border-Outline font-medium text-sm md:text-base w-full px-3 outline-none focus:border-primary" 
                {...register('username')} 
              />
              <input 
                type="password" 
                placeholder='비밀번호를 입력하세요.'  
                className="h-9 md:h-11 rounded-lg border border-Outline font-medium text-sm md:text-base w-full px-3 mt-2 outline-none focus:border-primary" 
                {...register('password')} 
              />
              <div className="text-center mt-5">
                  <button className="font-semibold text-sm md:text-base text-OnPrimary bg-primary h-9 px-4 rounded leading-none">로그인 하기</button>
              </div>
          </form>
          
          <div className="mt-5 text-center">
            <p className="font-medium text-[13px] text-[#A5A5A5]">간편 회원가입</p>
            <div className="flex justify-center mt-2">
              <Kakao/>
            </div>
          </div>
          <div className="text-center text-primary font-medium text-[13px] mt-[34px]">
              <Link href={"/find"}>비밀번호 찾기</Link>
              <Link href={"/signup"} className="pl-[10px] ml-[10px] relative before:block before:w-[1px] before:absolute before:left-0 before:top-0 before:h-full  before:bg-primary">회원가입 하기</Link>
          </div>
      </div>
    </div>
  )
}
