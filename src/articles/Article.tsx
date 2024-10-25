'use client'
import Image from "next/image";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
import {ArticleType} from "./lib/ArticleServices";
import WidgetDisplaySwitch from "../widgets/WidgetDisplaySwitch";
import {WidgetType} from "../widgets/WidgetsPanel";

export default function Article(
    {
        children,
        article,
        id = article?._id,
        title = article?.title,
        description = article?.description,
        imgSrc = article?.imgSrc,
        imgAlt= article?.imgAlt||"Default image ALT text",
        imgDesc=article?.imgDesc,
        bodyHTML=article?.bodyHTML,
        widgets=article?.widgets,
            goBack = true,
            isHome = false,
        creationDate=article?.creationDate,
        lastUpdate=article?.lastUpdate,
        }:Readonly<{
        children?: React.ReactNode;
        article?:ArticleType,
        id?:string,
        title?:string,
        description?:string,
        imgSrc?:string,
        imgAlt?:string,
        imgDesc?:string,
        bodyHTML?:string,
        widgets?:WidgetType[],
            goBack?:boolean,
            isHome?:boolean,
        creationDate?:string,
        lastUpdate?:string,
    }>){

        const returnHome=()=>{
                let elem = document.getElementById('scrollBar')
                if(elem){
                        elem.scrollLeft=0;
                }
        }

    return (
        <div id={id} className={'py-8 min-w-[80vw] h-fit px-4 sm:px-8 md:px-12 lg:px-32 mx-[10vw] relative md:snap-center md:snap-mandatory min-h-[90vh] group border border-amber-100 rounded-lg bg-gradient-to-b from-gray-900 to-gray-700 from-50% shadow-gray-700 shadow-2xl mb-16'}>
            {(!isHome&&goBack)&&<button className={'hidden md:block absolute md:text-6xl left-16  '} onClick={returnHome}>
                ←
            </button>}
            {/*<h1 className={'text-4xl text-center font-bold text-yellow-100 m-2'}>Jeremy Cox</h1>*/}
            <h1 id={`H:${id}`} className={'text-amber-100 font-bold text-center'}>{title}</h1>
            {lastUpdate&&
            <span className={'w-full flex justify-between'}>
                <span>last edit:</span>
                <span>{new Date(lastUpdate).toDateString()}</span>
                <span>{new Date(lastUpdate).toLocaleTimeString()}</span>
            </span>
            }
            {description&&
                <p className={'p-6 m-2 bg-gray-700'}>{description}</p>
            }
            {imgSrc&&
                <>
                    <Image className={'m-auto mt-6 mb-10  shadow-amber-200 shadow-lg group-hover:shadow-amber-200 group-hover:shadow-xl transition-shadow duration-700 w-4/5 max-w-[300px] md:max-w-[400px] lg:max-w-[680px]'} src={imgSrc} alt={imgAlt} width={0} sizes={'100vw'} height={0} id={'jeremy1'}  draggable={false} />
                    {imgDesc&&
                        <>
                            {imgDesc}
                        </>
                    }
                </>

            }
            {bodyHTML&&
                <div className={'bodyHTML'} dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(bodyHTML)}}/>
            }
            {children}
            <div className={'pt-24'}>
                {widgets&&
                    widgets.map(widget=>{
                        return(
                            <WidgetDisplaySwitch key={widget.name} widget={widget}/>
                        )
                    })
                }
            </div>
        </div>

)
}