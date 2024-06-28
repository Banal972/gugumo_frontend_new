import {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                username: { type: "text", placeholder: "이메일을 입력해주세요." },
                password: { type: "password",placeholder: "비밀번호를 입력해주세요." }
            },
            async authorize(credentials) : Promise<any> {
                if(!credentials) return null;

                try {

                    const response = await fetch(`${process.env.API_URL}/api/v1/emailLogin`,{
                        method : "POST",
                        headers : {
                            "content-type" : "application/json"
                        },
                        body : JSON.stringify({
                            username: credentials.username,
                            password: credentials.password
                        })
                    });

                    if(response.ok){
                        const data = await response.json();

                        if(data.status === "success"){
                            return {token : data.data};
                        }else{
                            return null;
                        }
                    }else{
                        console.log(response);
                        return null;
                    }

                } catch (err){
                    console.log(err);
                    return null;
                }

            },
        }),
        KakaoProvider({
            clientId : process.env.KAKAO_RESTAPI || "",
            clientSecret : process.env.KAKAO_CLIENT || ""
        })
    ],
    callbacks : {
        async jwt({user,token,account} : any) : Promise<any>{

            if(account?.type !== "credentials" && user){

                const response = await fetch(`${process.env.API_URL}/kakao/login`,{
                    method : "POST",
                    headers : {
                        "content-type" : "application/json"
                    },
                    body : JSON.stringify({
                        username : user.email,
                        nickname : user.name,
                        kakaoId : user.id,
                        profilePath : user.image
                    })
                });

                const data = await response.json();

                if(data.status !== "fail"){
                    token.accessToken = data.data;
                }

            }

            if(account?.type === "credentials" && user){
                token.accessToken = user.token;
            }

            return token;

        },
        async session({session,token} : any) : Promise<any>{

            if(token.accessToken){
                session.accessToken = token.accessToken;
            }

            return session;
        }
    },
    secret : process.env.NEXTAUTH_SECRET,
}