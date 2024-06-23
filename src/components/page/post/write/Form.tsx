"use client"
import { Editor } from "@toast-ui/react-editor";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import { IoChevronDown } from "react-icons/io5";
import DownIcon from "@/asset/image/down.svg";
import { useRouter } from "next/navigation";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Form({session} : {session : any}) {

    const router = useRouter();
    const editorRef = useRef<Editor>(null);
    const {register,handleSubmit,watch} = useForm();
    const [isMeetingDate,setIsMeetingDate] = useState(false);
    const [isMeetingDeadline,setIsMeetingDeadline] = useState(false);
    const [meetingDate,setMeetingDate] = useState<Value>(new Date());
    const [meetingDeadline,setMeetingDeadline] = useState<Value>(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000));
    const [selectDays,setSelectDays] = useState<string[]>([]);
    const meetingTypeWatch = watch('meetingType','SHORT');

    useEffect(()=>{

        editorRef.current?.getInstance().setMarkdown('');

    },[]);
    
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
        const {meetingType,location,gameType,meetingMemberNum,meetingTime,openKakao,title} = event;
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
            location
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

    }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex items-center gap-3">
            <p className="flex flex-none size-[34px] rounded-full bg-primary text-2xl font-semibold text-white items-center justify-center">1</p>
            <h3 className="text-2xl font-medium">모임 정보를 입력해주세요</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7 mt-5 md:mt-8">

            <div className="min-w-0 flex flex-col gap-[10px]">
                <label htmlFor="meetingType" className="text-sm md:text-base font-medium px-2">모집형식</label>
                <div className="relative">
                    <select id="meetingType" className="w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border appearance-none" {...register('meetingType')} >
                        <option value="SHORT">단기모집</option>
                        <option value="LONG">장기모집</option>
                    </select>
                    <DownIcon className={"absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"} stroke={'#878787'}/>
                </div>
            </div>

            <div className="min-w-0 flex flex-col gap-[10px]">
                <label htmlFor="" className="text-sm md:text-base font-medium px-2">지역 선택</label>
                <div className="relative">
                    <select  {...register('location')} className="w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border">
                        <option value="">지역 선택을 선택해주세요.</option>
                        <option value="SEOUL">서울</option>
                        <option value="INCHEON">인천</option>
                        <option value="GYEONGGI">경기</option>
                        <option value="DAEGU">대구</option>
                        <option value="BUSAN">부산</option>
                        <option value="GYEONGNAM">경남</option>
                        <option value="GYEONGBUK">경북</option>
                        <option value="GANGWON">경원</option>
                        <option value="JEONNAM">전남</option>
                        <option value="JEONBUK">전북</option>
                        <option value="OTHER">그외</option>
                    </select>
                </div>
            </div>

            <div className="min-w-0 flex flex-col gap-[10px]">
                <label htmlFor="" className="text-sm md:text-base font-medium px-2">구기종목</label>
                <div className="relative">
                    <select {...register('gameType')} className="w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border">
                        <option value="">구기종목을 선택해주세요.</option>
                        <option value="BADMINTON">배드민턴</option>
                        <option value="BASKETBALL">농구</option>
                        <option value="FUTSAL">풋살</option>
                        <option value="TENNIS">테니스</option>
                        <option value="TABLETENNIS">탁구</option>
                        <option value="BASEBALL">야구</option>
                    </select>
                </div>
            </div>

            <div className="min-w-0 flex flex-col gap-[10px]">
                <label htmlFor="" className="text-sm md:text-base font-medium px-2">모집 인원</label>
                <select {...register('meetingMemberNum')} className="w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border">
                    <option value="">모집인원을 선택해주세요.</option>
                    <option value="1">1명</option>
                    <option value="2">2명</option>
                    <option value="3">3명</option>
                    <option value="4">4명</option>
                    <option value="5">5명 이상</option>
                </select>
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
                        <IoChevronDown className="absolute right-4 top-1/2 -translate-y-1/2"/>
                    </div>
                </div>
            }

            {
                meetingTypeWatch === "LONG" &&
                <div className="min-w-0 flex flex-col gap-[10px]">
                    <label htmlFor="meetingTime" className="text-sm md:text-base font-medium px-2">시간대</label>
                    <select className="w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border" id="meetingTime" {...register('meetingTime')}>
                        <option value="">시간대을 선택해주세요.</option>
                        {
                            Array.from({length : 23},(_,i)=>< option key={i} value={i+1}>{i+1}시</option>)
                        }
                    </select>
                </div>
            }

            {
                meetingTypeWatch === "LONG" &&
                <div className="min-w-0 flex flex-col gap-[10px]">
                    <label htmlFor="" className="text-sm md:text-base font-medium px-2">모임 요일</label>
                    <div className="flex flex-wrap min-w-0 mt-[10px] gap-[10px] justify-start">
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
                    <IoChevronDown className="absolute right-4 top-1/2 -translate-y-1/2"/>
                </div>
            </div>

            <div className="min-w-0 flex flex-col gap-[10px]">
                <label htmlFor="" className="text-sm md:text-base font-medium px-2">오픈카톡 주소</label>
                <div className="relative">
                    <input {...register('openKakao')} className="w-full h-11 md:h-16 rounded-lg bg-Surface text-sm md:text-base font-medium px-4 box-border" type="text" placeholder="오픈카톡 주소를 입력해주세요." />
                </div>
            </div>

        </div>

        <div className="mt-14 md:mt-[87px]">

            <div className="flex items-center gap-3">
                <p className="flex flex-none size-[34px] rounded-full bg-primary text-2xl font-semibold text-white items-center justify-center">2</p>
                <h3 className="text-2xl font-medium">모임에 대해 소개해주세요</h3>
            </div>

            <div className="mt-8">
                <label className="text-sm md:text-lg font-medium px-[6px]" htmlFor="title">제목</label>
                <input className="bg-Surface rounded-lg w-full h-11 md:h-14 text-sm md:text-base font-medium px-4 mt-3" type="text" placeholder="제목을 입력해주세요" {...register('title')}/>
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
            <button className="inline-flex items-center text-primary bg-OnPrimary text-sm md:text-base font-medium border border-[#4FAAFF] rounded py-[9.5px] px-4 justify-center cursor-pointer">새글 작성</button>
        </div>
    </form>
  )
}
