"use client"
import { Editor } from "@toast-ui/react-editor";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import DownIcon from "@/asset/image/down.svg";
import { useRouter } from "next/navigation";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Form({session,edit} : {session : any,edit? : any}) {

    const router = useRouter();
    const editorRef = useRef<Editor>(null);
    const {register,handleSubmit,watch,setValue} = useForm();
    const [isMeetingDate,setIsMeetingDate] = useState(false);
    const [isMeetingDeadline,setIsMeetingDeadline] = useState(false);
    const [meetingDate,setMeetingDate] = useState<Value>(new Date());
    const [meetingDeadline,setMeetingDeadline] = useState<Value>(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000));
    const [selectDays,setSelectDays] = useState<string[]>([]);
    const meetingTypeWatch = watch('meetingType','SHORT');

    useEffect(()=>{
        if(edit){
            editorRef.current?.getInstance().setMarkdown(edit.content);
            Object.keys(edit).forEach((key) => { // 가져온 데이터의 각 키와 값을 반복하여 setValue로 설정합니다.
                if(key === "meetingTime"){
                    setValue(key, edit[key].split(":")[0]);
                }else if(key === "meetingDays"){
                    const array : string[] = edit[key].split(';');
                    setSelectDays([...array]);
                }else {
                    setValue(key, edit[key]);
                }
            });
        }else{
            editorRef.current?.getInstance().setMarkdown('');
        }
    },[edit]);
    
    const meetingDateHandler = (value: Value)=>{
        setMeetingDate(value);
        setIsMeetingDate(false);
    }

    const meetingDeadlineHandler = (value: Value)=>{
        setMeetingDeadline(value);
        setIsMeetingDeadline(false);
    }

    const selectDayHandler = (day : string)=>{
        if(selectDays.includes(day)){
            setSelectDays(selectDays.filter(el=>el !== day));
        }else{
            setSelectDays(prev=>([
                ...prev,
                day
            ]))
        }
    }

    const onSubmitHandler = async (event : any)=>{
        const {meetingStatus,meetingType,location,gameType,meetingMemberNum,meetingTime,openKakao,title} = event;
        const content = editorRef.current?.getInstance().getHTML();

        if(gameType === ""){
            return alert('구기종목을 선택해주세요.');
        }

        if(location === ""){
            return alert('지역 선택을 해야합니다.');
        }

        if(meetingType === "LONG"){
            if(meetingTime === ""){
                return alert('시간대을 선택해주세요.');
            }
            if(selectDays.length <= 0){
                return alert('요일을 선택해주세요.');
            }
        }

        if(meetingMemberNum === ""){
            return alert('모집인원을 선택해주세요.');
        }

        if(openKakao === ""){
            return alert('오픈카톡을 입력해주세요.');
        }
    
        if(title === ""){
            return alert('제목을 입력해주세요.');
        }
    
        if(content === ""){
            return alert('내용을 입력해주세요.');
        }

        if(!edit){

            const body = {
                meetingType,
                gameType,
                meetingMemberNum,
                meetingDate : moment(meetingDate as Date).format("YYYY-MM-DD"),
                meetingDays : selectDays.join(';'),
                meetingTime,
                meetingDeadline : moment(meetingDeadline as Date).format("YYYY-MM-DD"),
                openKakao,
                title,
                content,
                location,
            }

            try {
                const response = await fetch('/back/api/v1/meeting/new',{
                    method : "POST",
                    headers : {
                        'Content-Type': 'application/json',
                        "Authorization" : session.accessToken
                    },
                    body : JSON.stringify(body)
                });
                if(response.ok){
    
                    const data = await response.json();
    
                    if(data.status === "success"){
                        alert('등록이 완료 되었습니다.');
                        return router.push('/');
                    }else{
                        return alert('등록에 실패 했습니다.')
                    }
    
                }
            }
            catch(err){
                console.log(err);
                alert('오류가 발생 했습니다.')
            }

        }else{

            const body = {
                meetingType,
                gameType,
                meetingMemberNum,
                meetingDate : moment(meetingDate as Date).format("YYYY-MM-DD"),
                meetingDays : selectDays.join(';'),
                meetingTime,
                meetingDeadline : moment(meetingDeadline as Date).format("YYYY-MM-DD"),
                openKakao,
                title,
                content,
                location,
                meetingStatus
            }

            try {
                const response = await fetch(`/back/api/v1/meeting/${edit.postId}`,{
                    method : "PATCH",
                    headers : {
                        'Content-Type': 'application/json',
                        "Authorization" : session.accessToken
                    },
                    body : JSON.stringify(body)
                });
                if(response.ok){
    
                    const data = await response.json();
    
                    if(data.status === "success"){
                        alert('수정이 완료 되었습니다.');
                        return router.push('/');
                    }else{
                        return alert('수정에 실패 했습니다.')
                    }
    
                }else{
                    console.log(response);
                    return alert('수정에 실패 했습니다.')
                }
            }
            catch(err){
                console.log(err);
                alert('오류가 발생 했습니다.')
            }

        }

    }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>

        <div className="flex items-center gap-2 md:gap-3">
            <p className="flex flex-none size-[23px] md:size-[34px] rounded-full bg-primary text-lg md:text-2xl font-semibold text-white items-center justify-center">1</p>
            <h3 className="text-lg md:text-2xl font-medium">모임 정보를 입력해주세요</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7 mt-5 md:mt-8">

            {
                edit &&
                <div className="min-w-0 flex flex-col gap-[10px]">
                    <label htmlFor="meetingStatus" className="text-sm md:text-base font-medium px-2">모집상태</label>
                    <div className="relative">
                        <select 
                            id="meetingStatus" 
                            className="w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border appearance-none border border-transparent outline-none focus:border-primary" 
                            {...register('meetingStatus')}
                        >
                            <option value="RECRUIT">모집중</option>
                            <option value="END">모집완료</option>
                        </select>
                        <DownIcon className={"absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"} stroke={'#878787'}/>
                    </div>
                </div>
            }

            <div className="min-w-0 flex flex-col gap-[10px]">
                <label htmlFor="meetingType" className="text-sm md:text-base font-medium px-2">모집형식</label>
                <div className="relative">
                    <select 
                        id="meetingType" 
                        className="w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border appearance-none border border-transparent outline-none focus:border-primary" 
                        {...register('meetingType')} 
                    >
                        <option value="SHORT">단기모집</option>
                        <option value="LONG">장기모집</option>
                    </select>
                    <DownIcon className={"absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"} stroke={'#878787'}/>
                </div>
            </div>

            <div className="min-w-0 flex flex-col gap-[10px]">
                <label htmlFor="location" className="text-sm md:text-base font-medium px-2">지역 선택</label>
                <div className="relative">
                    <select
                        id="location"
                        className={`w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border appearance-none border border-transparent outline-none focus:border-primary ${!watch('location') ? "text-gray-400" : ""}`}
                        {...register('location')}
                    >
                        <option value="">지역 선택을 선택해주세요.</option>
                        <option value="SEOUL" className="text-black">서울</option>
                        <option value="INCHEON" className="text-black">인천</option>
                        <option value="GYEONGGI" className="text-black">경기</option>
                        <option value="DAEGU" className="text-black">대구</option>
                        <option value="BUSAN" className="text-black">부산</option>
                        <option value="GYEONGNAM" className="text-black">경남</option>
                        <option value="GYEONGBUK" className="text-black">경북</option>
                        <option value="GANGWON" className="text-black">경원</option>
                        <option value="JEONNAM" className="text-black">전남</option>
                        <option value="JEONBUK" className="text-black">전북</option>
                        <option value="OTHER" className="text-black">그외</option>
                    </select>
                    <DownIcon className={"absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"} stroke={'#878787'}/>
                </div>
            </div>

            <div className="min-w-0 flex flex-col gap-[10px]">
                <label htmlFor="gameType" className="text-sm md:text-base font-medium px-2">구기종목</label>
                <div className="relative">
                    <select
                        id="gameType"
                        className={`w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border appearance-none border border-transparent outline-none focus:border-primary ${!watch('gameType') ? "text-gray-400" : ""}`}
                        {...register('gameType')}
                    >
                        <option value="">구기종목을 선택해주세요.</option>
                        <option value="BADMINTON" className="text-black">배드민턴</option>
                        <option value="BASKETBALL" className="text-black">농구</option>
                        <option value="FUTSAL" className="text-black">풋살</option>
                        <option value="TENNIS" className="text-black">테니스</option>
                        <option value="TABLETENNIS" className="text-black">탁구</option>
                        <option value="BASEBALL" className="text-black">야구</option>
                    </select>
                    <DownIcon className={"absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"} stroke={'#878787'}/>
                </div>
            </div>

            <div className="min-w-0 flex flex-col gap-[10px]">
                <label htmlFor="meetingMemberNum" className="text-sm md:text-base font-medium px-2">모집 인원</label>
                <div className="relative">
                    <select 
                        id="meetingMemberNum"
                        className={`w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border appearance-none border border-transparent outline-none focus:border-primary ${!watch('meetingMemberNum') ? "text-gray-400" : ""}`}
                        {...register('meetingMemberNum')}
                    >
                        <option value="">모집인원을 선택해주세요.</option>
                        <option value="1" className="text-black">1명</option>
                        <option value="2" className="text-black">2명</option>
                        <option value="3" className="text-black">3명</option>
                        <option value="4" className="text-black">4명</option>
                        <option value="5" className="text-black">5명 이상</option>
                    </select>
                    <DownIcon className={"absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"} stroke={'#878787'}/>
                </div>
            </div>

            {
                meetingTypeWatch === "SHORT" &&
                <div className="min-w-0 flex flex-col gap-[10px]">
                    <label htmlFor="" className="text-sm md:text-base font-medium px-2">모임 날짜</label>
                    <div className="relative">
                        <div onClick={()=>setIsMeetingDate(!isMeetingDate)} className="w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border flex items-center cursor-pointer">
                            {moment(meetingDate as Date).format("YYYY-MM-DD")}
                        </div>
                        {
                            isMeetingDate && <Calendar value={meetingDate} minDate={new Date()} onChange={meetingDateHandler} className="absolute top-full z-10"/>
                        }
                        <DownIcon className={"absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"} stroke={'#878787'}/>
                    </div>
                </div>
            }

            {
                meetingTypeWatch === "LONG" &&
                <div className="min-w-0 flex flex-col gap-[10px]">
                    <label htmlFor="meetingTime" className="text-sm md:text-base font-medium px-2">시간대</label>
                    <div className="relative">
                        <select 
                            id="meetingTime"
                            className={`w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border appearance-none border border-transparent outline-none focus:border-primary ${!watch('meetingTime') ? "text-gray-400" : ""}`}
                            {...register('meetingTime')}
                        >
                            <option value="">시간대을 선택해주세요.</option>
                            {
                                Array.from({length : 23},(_,i)=><option key={i} value={i+1}  className="text-black">{i+1}시</option>)
                            }
                        </select>
                        <DownIcon className={"absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"} stroke={'#878787'}/>
                    </div>
                </div>
            }

            {
                meetingTypeWatch === "LONG" &&
                <div className="min-w-0 flex flex-col gap-[10px]">
                    <label htmlFor="" className="text-sm md:text-base font-medium px-2">모임 요일</label>
                    <div className="flex flex-wrap min-w-0 gap-[10px] justify-start">
                        {
                            ['월','화','수','목','금','토','일'].map((el,index)=>
                                <div 
                                    onClick={()=>selectDayHandler(el)} 
                                    key={index} 
                                    className={`flex-none w-16 h-14 rounded-lg text-sm md:text-base font-medium relative flex items-center justify-center cursor-pointer ${selectDays.includes(el) ? "text-white bg-primary" : "text-OnSurface bg-Surface"}`}
                                >{el}</div>
                            )
                        }
                    </div>
                </div>
            }

            <div className="min-w-0 flex flex-col gap-[10px]">
                <label htmlFor="" className="text-sm md:text-base font-medium px-2">모집 마감</label>
                <div className="relative">
                    <div onClick={()=>setIsMeetingDeadline(!isMeetingDeadline)} className="w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border flex items-center cursor-pointer">
                        {moment(meetingDeadline as Date).format("YYYY-MM-DD")}
                    </div>
                    {
                        isMeetingDeadline && <Calendar value={meetingDeadline} minDate={new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)} onChange={meetingDeadlineHandler} className="absolute top-full z-10"/>
                    }
                    <DownIcon className={"absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"} stroke={'#878787'}/>
                </div>
            </div>

            <div className="min-w-0 flex flex-col gap-[10px]">
                <label htmlFor="" className="text-sm md:text-base font-medium px-2">오픈카톡 주소</label>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="오픈카톡 주소를 입력해주세요."
                        className="w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border appearance-none border border-transparent outline-none focus:border-primary"
                        {...register('openKakao')} 
                    />
                </div>
            </div>

        </div>

        <div className="mt-14 md:mt-[87px]">

            <div className="flex items-center gap-2 md:gap-3">
                <p className="flex flex-none size-[23px] md:size-[34px] rounded-full bg-primary text-lg md:text-2xl font-semibold text-white items-center justify-center">2</p>
                <h3 className="text-lg md:text-2xl font-medium">모임에 대해 소개해주세요</h3>
            </div>

            <div className="mt-8">
                <label className="text-sm md:text-lg font-medium px-[6px]" htmlFor="title">제목</label>
                <input 
                    type="text" 
                    placeholder="제목을 입력해주세요" 
                    className="bg-Surface rounded-lg w-full h-11 md:h-14 text-sm md:text-base font-medium px-4 mt-3 outline-none border border-transparent focus:border-primary"
                    {...register('title')}
                />
            </div>

            <div className="mt-7">
                <label className="text-sm md:text-lg font-medium px-[6px]" htmlFor="title">내용</label>
                <div className="h-[300px] md:h-[485px] rounded-xl mt-3">
                    <Editor
                        height="100%"
                        toolbarItems={[
                        ['heading', 'bold', 'italic', 'strike'],
                        ['hr', 'quote'],
                        ['ul', 'ol', 'task', 'indent', 'outdent'],
                        ['table', 'link'],
                        ]}
                        initialEditType="wysiwyg"
                        hideModeSwitch={true}
                        placeholder="내용을 입력해 주세요."
                        initialValue={""}
                        ref={editorRef}
                    />
                </div>
            </div>

        </div>

        <div className="text-center mt-10">
            <button 
                className={`inline-flex items-center text-sm md:text-base font-medium border border-[#4FAAFF] rounded py-[9.5px] px-4 justify-center cursor-pointer transition-all text-primary bg-OnPrimary hover:text-OnPrimary hover:bg-primary`}
            >{!edit ? "새글 작성" : "수정 하기" }</button>
        </div>

    </form>
  )
}
