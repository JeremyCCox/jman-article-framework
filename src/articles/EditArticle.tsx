'use client'
import {useQueryClient} from "react-query";
import {ArticleType} from "./lib/ArticleServices";
import {useDebouncedCallback} from "use-debounce";
import TextInput from "@/components/inputs/TextInput";
import MyTiptap from "@/components/inputs/MyTiptap";
import React, {useEffect, useState} from "react";
import {Editor} from "@tiptap/core";
import WidgetsPanel, {WidgetType} from "../widgets/WidgetsPanel";
import WidgetDisplaySwitch from "../widgets/WidgetDisplaySwitch";

export default function EditArticle({article,mutate,saveTime=2.5}:Readonly<{article:ArticleType,mutate:any,saveTime?:number}>){
    const [trackedArticle,setTrackedArticle]= useState(article)
    const [editState, setEditState] = useState(false)
    const [saveCountdown, setSaveCountdown] = useState(saveTime)
    const queryClient = useQueryClient();
    const updateArticle = useDebouncedCallback(()=>{
            setEditState(false)
            trackedArticle.lastUpdate = Date().toString();
            mutate.mutate(trackedArticle)
        }
    ,saveTime*1000)
    useEffect(()=>{
        if(editState){
            let countdown = setInterval(() => {
                setSaveCountdown(prevState => prevState - 0.1);
            }, 100);
            return ()=>{
                clearInterval(countdown)
            }
        }else{
            setSaveCountdown(saveTime)
        }
    },[editState])
    const runUpdateCallback =()=>{
        setEditState(true)
        setSaveCountdown(saveTime)
        updateArticle()

    }
    const editArticleBody = (e:Editor)=>{
        let newArticle = {...trackedArticle, bodyHTML: e.getHTML()}
        setTrackedArticle(newArticle)
        runUpdateCallback()
    }
    const editArticle = (e:React.ChangeEvent<HTMLInputElement>)=>{
        let newArticle = {...trackedArticle, [e.currentTarget.id]: e.currentTarget.value}
        setTrackedArticle(newArticle)
        runUpdateCallback()
    }
    const addWidgetToArticle = (widget:WidgetType)=>{
        let newArticle = {...trackedArticle, widgets:[...trackedArticle.widgets||[],widget]}
        setTrackedArticle(newArticle)
        runUpdateCallback()
    }
    const toggleArticlePublished =()=>{
        let newArticle = {...trackedArticle, published: !trackedArticle.published}
        setTrackedArticle(newArticle)
        runUpdateCallback()
    }
    const removeWidget=(e:React.MouseEvent<HTMLButtonElement>)=>{
        let newWidgets = trackedArticle.widgets?.filter(({id})=>!(id === e.currentTarget.id))
        let newA = {...trackedArticle, widgets: newWidgets }
        setTrackedArticle(newA)
        runUpdateCallback()
    }
    return(
        <>
            <div className={'flex flex-col min-h-[80vh] mx-20 my-24 border-amber-100 '}>
                <div className={'flex flex-col'}>
                    <div className={'w-full flex justify-between'}>
                       <span className={'w-1/4'}>
                            {editState?
                                <span>Next save in:   {saveCountdown.toFixed(1)} Last save:</span>
                                :
                                <span>Last save:</span>
                            }
                        </span>
                        <span>{new Date(trackedArticle.lastUpdate||Date.now()).toDateString()}</span>
                        <span>{new Date(trackedArticle.lastUpdate||Date.now()).toLocaleTimeString()}</span>
                        <span>
                            Published:
                            <input checked={trackedArticle.published} type={'checkbox'} onClick={toggleArticlePublished}/>
                        </span>
                    </div>
                </div>
                <TextInput type={'text'} title={"Title"} name={'title'} id={'title'} value={trackedArticle.title} onChange={editArticle}/>
                <TextInput type={'text'} title={"Description"} name={'description'} id={'description'} value={trackedArticle.description} onChange={editArticle} />
                <MyTiptap content={article.bodyHTML} onUpdate={editArticleBody}  className={"min-h-[60vh]"} />
                <WidgetsPanel addWidgetCallback={addWidgetToArticle} />
                {trackedArticle.widgets&&
                    trackedArticle.widgets.map(widget=>{
                        return(
                            <div className={' border border-amber-100 relative p-8'} key={`switch-name:${widget.id}`}>
                                <button className={'absolute right-0 top-0'} type={'button'} id={widget.id} onClick={removeWidget} >
                                    🗑️
                                </button>
                                <WidgetDisplaySwitch widget={widget}/>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}