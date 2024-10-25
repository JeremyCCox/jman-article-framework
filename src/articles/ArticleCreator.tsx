'use client'
import TextInput from "@/components/inputs/TextInput";
import MyTiptap from "@/components/inputs/MyTiptap";
import React, {useReducer} from "react";
import {Editor} from "@tiptap/core";
import {addArticle} from "./lib/ArticleServices";
import article from "./models/Article";
import {useRouter} from "next/navigation";
import WidgetsPanel, {WidgetType} from "../widgets/WidgetsPanel";
import WidgetDisplaySwitch from "../widgets/WidgetDisplaySwitch";

enum ArticleActionKind {
    TIPTAP = 'TIPTAP',
    TITLE = 'TITLE',
    DESC = 'DESC',
    WIDGET = 'WIDGET'
}
interface ArticleAction{
    type:string,
    payload:any;
}
interface ArticleState{
    _id?:string,
    title?:string,
    description?:string,
    category?:string,
    bodyHTML?:string,
    widgets?:WidgetType[],
    template?:string,
}
function articleReducer(state: ArticleState, action: ArticleAction) {
    const { type, payload } = action;
    switch (type) {
        case ArticleActionKind.TIPTAP:
            return {
                ...state,
                bodyHTML:payload
            };
        case ArticleActionKind.TITLE:
            return {
                ...state,
                title:payload

                // value: state.count - payload,
            }
        case ArticleActionKind.DESC:
            return {
                ...state,
                description:payload
            };
        case ArticleActionKind.WIDGET:
            return {
                ...state,
                widgets:[...state.widgets||[], payload]
            };
        default:
            return state;
    }
}
export default function ArticleCreator(){
    const [state,dispatch]=useReducer(articleReducer,{title:"",description:"",category:"",bodyHTML:"",widgets:[],template:""},undefined);
    const router = useRouter()
    const handleSubmit=async (e: React.MouseEvent) => {
        let creation = JSON.parse(await addArticle(state));
        if(!creation.error){
            router.push(`/admin/articles/${creation.data._id}`)
        } else {
            console.log(creation.error.message)
        }

    }
    const handleUpdate=(e:Editor)=>{
        dispatch({type:ArticleActionKind.TIPTAP,payload:e.getHTML()})
    }
    const addWidget=(widget:WidgetType)=>{
        dispatch({type:ArticleActionKind.WIDGET,payload:widget})
    }
    return(
        <>
            <div className={'grid'} >
                <WidgetsPanel addWidgetCallback={addWidget}/>
                <TextInput type={'text'} title={"Title"} name={'title'} id={'title'} onChange={(e)=>dispatch({type:ArticleActionKind.TITLE,payload:e.currentTarget.value})}/>
                <TextInput type={'text'} title={"Description"} name={'description'} id={'description'} onChange={(e)=>dispatch({type:ArticleActionKind.DESC,payload:e.currentTarget.value})} />
                <MyTiptap content={state.bodyHTML} onUpdate={handleUpdate}  className={"min-h-[60vh]"}/>
                {state.widgets&&
                    state.widgets.map(widget=>{
                        return(
                            <div key={widget.name}>
                                <WidgetDisplaySwitch key={widget.name} widget={widget}/>
                            </div>
                        )
                    })
                }
                <button type={"button"} onClick={handleSubmit}>
                    Post new article
                </button>
                {/*<div>*/}
                {/*    <pre className={'text-amber-100'}>*/}
                {/*        {JSON.stringify(state,null,2)}*/}
                {/*    </pre>*/}
                {/*</div>*/}
            </div>
        </>

    )

}