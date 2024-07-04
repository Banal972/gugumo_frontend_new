import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface commentDataT {
    commentId: number;
    author: string;
    content: string;
    createdDateTime: string;
    parentCommentId?: number;
    orderNum: number;
    notRoot: boolean;
    yours: boolean;
    authorExpired: boolean;
}

interface commentT {
    status: string;
    length : number;
    comments : commentDataT[];
    replys : commentDataT[];
    message?: any;
}

const fetchCommnets = async ({queryKey} : {queryKey : [string,any,string]})=>{
    const [,session,postid] = queryKey;
    const response = await fetch(`/back/api/v1/comment/${postid}`,{
        headers : {
            "Authorization" : session?.accessToken
        }
    });
    if(!response.ok){
        throw new Error('등록에 실패 하였습니다.');
    }
    const data = await response.json();
    const comments : commentDataT[] = data.data.filter((el : commentDataT)=>!el.parentCommentId);
    const replys : commentDataT[] = data.data.filter((el : commentDataT)=>el.parentCommentId);

    return {
        status : data.status,
        length : data.data.length,
        comments,
        replys,
        message : data.message,
    }
}

const postCommnet = async (newComment : any)=>{
    const response = await fetch('/back/api/v1/comment/new',{
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "Authorization" : newComment.session.accessToken
        },
        body : JSON.stringify(newComment.body)
    })
    if(!response.ok){
        throw new Error('등록에 실패 하였습니다.');
    }
}

const patchCommnet = async (data : any)=>{
    const response = await fetch(`/back/api/v1/comment/${data.comment_id}`,{
        method : "PATCH",
        headers : {
            "Content-Type": "application/json",
            "Authorization" : data.session.accessToken
        },
        body : JSON.stringify(data.body)
    })
    if(!response.ok){
        throw new Error('수정에 실패했습니다.');
    }
}

const deleteComment = async (data : any)=>{
    const response = await fetch(`/back/api/v1/comment/${data.comment_id}`,{
        method : "DELETE",
        headers : {
            "Authorization" : data.session.accessToken
        }
    })
    if(!response.ok){
        throw new Error('삭제에 실패했습니다.');
    }
}

export const useCommnets = (session : any,postid : string)=>{
    const {data : comment,isLoading,isError} = useQuery({queryKey : ["commnet",session,postid],queryFn : fetchCommnets})
    return {
        comment,
        isLoading,
        isError
    }
}

export const usePostCommnet = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (newComment :any)=> postCommnet(newComment),
        onSuccess : () =>{
            queryClient.invalidateQueries({
                queryKey : ['commnet']
            })
        }
    })
}

export const useDeleteComment = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (data :any)=> deleteComment(data),
        onSuccess : () =>{
            queryClient.invalidateQueries({
                queryKey : ['commnet']
            })
        }
    })
}

export const usePatchCommnet = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (data :any)=> patchCommnet(data),
        onSuccess : () =>{
            queryClient.invalidateQueries({
                queryKey : ['commnet']
            })
        },
        onError : (err)=>{
            console.log(err);
        }
    })
}