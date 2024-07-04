import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchPost = async ({queryKey} : {queryKey : [string,any,string,number]})=>{
    const [,session,q,page] = queryKey;
    const response = await fetch(`/back/api/v1/meeting/my?q=${q}&page=${page}`,{
        headers : {
            "Authorization" : session?.accessToken
        }
    });
    if(!response.ok){
        throw new Error('불러오는데 실패 하였습니다.');
    }
    return response.json();
}

export const usePost = (session : any,page : number)=>{
    
    const [q, setQ] = useState('');
    const {data,isLoading,isError} = useQuery({queryKey : ["postlist",session,q,page],queryFn : fetchPost});

    return {
        posts : data?.data.content,
        pageable : data?.data.pageable,
        isLoading,
        isError,
        setQ
    }

}