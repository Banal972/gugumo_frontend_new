import { useQuery } from "@tanstack/react-query";

const fetchRecommend = async ({queryKey} : {queryKey : [string,any]})=>{

    const [,session] = queryKey;

    const response = await fetch(`/back/api/v1/meeting/recommend`,{
        headers : {
            "Authorization" : session?.accessToken
        },
    });
    if(!response.ok){
        throw new Error("불러오는데 실패 하였습니다.");
    }

    return response.json();

}

export const useRecommend = (session : any) => {
    const {data : recommends, isLoading, isError} = useQuery({queryKey : ['recommend',session],queryFn : fetchRecommend});
    
    return {
        recommends,
        isLoading,
        isError
    }

}