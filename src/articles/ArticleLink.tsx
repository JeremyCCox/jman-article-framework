'use client'
import React from "react";

export default function ArticleLink({children,id,value,underline}:Readonly<{ children?:React.ReactNode,id?: string,value?:string,underline?:boolean }>){
    const handleClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
        let scroller = document.getElementById('scrollBar')
        let elem = document.getElementById(`${e.currentTarget.id.split(':')[1]}`)
        if(scroller && elem){
            console.log(window.innerWidth)
            if(window.innerWidth>=768){
                scroller.scrollLeft = elem.offsetLeft

            }else{
                window.scrollTo(elem.offsetLeft,elem.offsetTop+80)
                // window.location.hash=`H:${e.currentTarget.id.split(':')[1]}`
            }
            console.log(scroller.scrollTop, elem.offsetTop)
            // scroller.scrollTop = elem.offsetTop
        }
    }

    return(
        <>
            <button id={id} type={"button"} className={'hover:font-bold hover:tracking-tight'}  onClick={handleClick}>
                <h4 className={`w-fit m-auto  ${!underline&&"hover:underline"}`}>
                    {underline&&value&&
                        <span className={"absolute no-underline translate-y-[16px]"}>
                        {Array.from(Array(Math.floor(value.length)).fill('-')).map(val=>{
                            return (val)
                        })}
                            &gt;
                    </span>
                    }
                    {value&&value}
                </h4>
            </button>
            {children}
        </>

    )
}