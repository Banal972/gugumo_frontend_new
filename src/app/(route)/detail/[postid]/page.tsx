import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Headers from "@/components/Layout/Headers/Headers";
import Wrap from "@/components/Common/Wrap";
import Footers from "@/components/Layout/Footers/Footers";
import DetailUI from "@/components/page/post/detail/DetailUI";
import Recommends from "@/components/Layout/Recommends/Recommends";
import Comments from "@/components/page/post/detail/Comment/Comments";
import { Suspense } from "react";
import Skeleton from "@/components/page/post/detail/SkeletonUI/Skeleton";

export default async function Detail({params} : {params : {postid : string}}) {

    const session = await getServerSession(authOptions) as any;

    const res = await fetch(`${process.env.API_URL}/api/v1/meeting/${params.postid}`,{
        headers : {
            "Authorization" : session?.accessToken
        },
        cache : "no-store"
    })

    const detail = await res.json();

  return (
    <>
        <Headers/>
        <main className="pt-10 md:pt-[108px] pb-36 md:pb-40">
            <Wrap>
                <Suspense fallback={<Skeleton/>}>
                    <DetailUI detail={detail} postid={params.postid}/>
                    <Recommends/>
                    <Comments session={session} postid={params.postid}/>
                </Suspense>
            </Wrap>
        </main>
        <Footers/>
    </>
  )
}
