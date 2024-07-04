"use client"
import Image from "next/image";

const GAMETYPE = [{get : "BADMINTON",name : "배드민턴"},{get : "FUTSAL",name : "풋살"},{get : "BASKETBALL",name : "농구"},{get : "TENNIS",name : "테니스"},{get : "TABLETENNIS",name : "탁구"},{get : "BASEBALL",name : "야구"}];
export default function Gametype({gametype,setGametype} : {gametype:string,setGametype : any}) {
  return (
    <>
        <p className="text-base md:text-lg font-semibold text-OnSurface">종목</p>
        <div className="flex md:flex-wrap overflow-x-auto gap-[4px] md:gap-[14px] mt-[11px] pb-1">
            <button 
                onClick={()=>setGametype("")} 
                className={`size-[77px] flex-none border border-primary box-border rounded-full relative cursor-pointer overflow-hidden ${gametype === "" ? "bg-primary text-white" : "bg-background text-primary"}`}
            >
                <div className={`absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center gap-[2px] text-sm font-medium `}>전체</div>
            </button>
            {
                GAMETYPE.map((el,index)=>{
                    let option = {
                        src : "",
                        width : 0,
                        height : 0
                    };
                    switch(el.get){
                        case "BADMINTON":
                            option = {
                                src : "/asset/image/balltype/ball01.png",
                                width : 35,
                                height : 35
                            };
                            break;
                        case "FUTSAL":
                            option = {
                                src : "/asset/image/balltype/ball02.png",
                                width : 31,
                                height : 31
                            };
                            break;
                        case "BASKETBALL":
                            option = {
                                src : "/asset/image/balltype/ball03.png",
                                width : 31,
                                height : 32
                            };
                            break;
                        case "TENNIS":
                            option = {
                                src : "/asset/image/balltype/ball04.png",
                                width : 31,
                                height : 30
                            };
                            break;
                        case "TABLETENNIS":
                            option = {
                                src : "/asset/image/balltype/ball05.png",
                                width : 34,
                                height : 34
                            };
                            break;
                        case "BASEBALL":
                            option = {
                                src : "/asset/image/balltype/ball06.png",
                                width : 30,
                                height : 30
                            };
                            break;
                    }

                    return (
                        <button 
                            onClick={()=>setGametype(el.get)} 
                            key={index} 
                            className={`size-[77px] flex-none border border-primary box-border rounded-full relative cursor-pointer overflow-hidden ${gametype === el.get ? "bg-primary text-white" : "bg-background text-primary"}`}
                        >
                            <div className={`absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center gap-[2px] text-sm font-medium `}>
                                <Image src={ gametype === el.get && gametype === "BADMINTON" ? "/asset/image/balltype/ball01_active.png" : option.src} width={option.width} height={option.height} alt={el.name}/>
                                {el.name}
                            </div>
                        </button>
                    )
                })
            }
        </div>
    </>
  )
}
