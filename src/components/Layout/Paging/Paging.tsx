"use client"
export default function Paging({pageable,setPage} : {pageable : any,setPage : any}) {
    
    const currentGroup = Math.ceil(pageable.number / 5);
    const startPage = (currentGroup - 1) * 5 + 1;
    const endPage = Math.min(startPage + 5 -1, pageable.totalPages);

    return (
        <div className="flex gap-5 justify-center mt-[42px]">
            {
                Array.from({length : endPage - startPage + 1}, (_,index)=>{
                    const page = startPage + index;
                    return (
                        <button 
                            type="button" 
                            className={`cursor-pointer ${pageable.number === page ? "text-primary" : ""}`} 
                            key={page} 
                            onClick={() => setPage(page)}
                        >
                            {page}
                        </button>
                    )
                })
            }
        </div>
    )
}
