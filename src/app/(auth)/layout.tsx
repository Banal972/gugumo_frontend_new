import Footers from "@/components/Layout/Footers/Footers";
import Headers from "@/components/Layout/Headers/Headers";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function layout({children} : {children :React.ReactNode}) {
  const session = await getServerSession(authOptions) as any;

  if(!session || !session.accessToken){
    return redirect('/');
  }

  return (
    <>
      <Headers/>
      {children}
      <Footers/>
    </>
  )
}
