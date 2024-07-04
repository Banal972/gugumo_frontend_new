import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import { redirect, useRouter } from "next/navigation";

export default async function oauthCallback() {

    const session = await getServerSession(authOptions) as any;
    if(session && !session.accessToken) {
        return redirect('/signup');
    }else{
        return redirect('/');
    }

}
