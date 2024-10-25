'use client'
import React,{MouseEvent} from "react";
import {ArticleType} from "./lib/ArticleServices";
import {useRouter} from "next/navigation";
export default function AdminArticleLink({children,article,underline=false,deleteArticle}:Readonly<{ children?:React.ReactNode,article: ArticleType,underline?:boolean,deleteArticle:(articleId:string)=>void}>){
    const router = useRouter()
    const handleClick=()=>{
        router.push(`/admin/articles/${article?._id}`)
    }
    const delArt=(e:MouseEvent<HTMLButtonElement>)=>{
        deleteArticle(e.currentTarget.id)
    }
    return(
        <>
            <h4 className={'w-full flex flex-nowrap'}>
                <button type={"button"} className={'w-full hover:font-bold hover:tracking-tight'}  onClick={handleClick}>
                    <div className={`grow mr-1 flex justify-between bg-gray-700 border-gray-900 border-2 hover:underline`}>
                        <span className={' text-left px-8'}>{article.title}</span>

                        {!underline&&article.creationDate&&
                            new Date(article.creationDate).toDateString()
                        }
                    </div>
                </button>
                <button type={"button"} id={article._id} onClick={delArt} className={'w-fit hover:bg-gray-700 rounded'}>
                    🗑️
                </button>
            </h4>

            {children}
        </>

    )
}