'use client'

import {ChangeEvent, MouseEvent, useState } from "react"
import NewWidget from "./NewWidget"
import WidgetDisplaySwitch from "./WidgetDisplaySwitch";

export interface WidgetType{
    id:string,
    name:string,
    component:string,
    parameters:string[],
    values:{[key:string]:string},

}

const selectableWidgets = [
    {
        id:'unset',
        name:"Github Releases Download",
        component:"releaseDownload",
        parameters:["owner", "repository"],
        values:{}
    },
    {
        id:"unset",
        name:"Github Repository Preview",
        component:"githubPreview",
        parameters:["owner", "repository"],
        values:{}
    }
]

export default function WidgetsPanel({addWidgetCallback}:Readonly<{ addWidgetCallback?:(widget:WidgetType)=>void }>){
    const [newWidget,setNewWidget]=useState<WidgetType>()
    const [widgets,setWidgets]=useState<WidgetType[]>([])
    const handleInput=(e:ChangeEvent<HTMLInputElement>)=>{
        setWidgets([{...widgets[0], values:{...widgets[0].values, [e.currentTarget.id]:e.currentTarget.value }}])
    }
    const addNewWidget=(e:MouseEvent<HTMLButtonElement>)=>{
        setNewWidget(selectableWidgets.find(({component})=> component === e.currentTarget.id))
    }
    const addWidget=(widget:WidgetType)=>{
        if(addWidgetCallback){
            addWidgetCallback(widget)
        }else{
            setWidgets(prevState=>[...prevState, widget]);
        }
    }
    return(
        <>
            <div className={'border-2 w-[400px] m-auto p-2 rounded-md '}>
                {selectableWidgets.map(widget=>{
                    return(
                        <button className={'hover:bg-gray-700 w-full text-left my-1'} value={widget.name} key={widget.name} id={widget.component} type={"button"} onClick={addNewWidget}>
                            {widget.name}
                        </button>
                    )
                })}
                {newWidget&&
                    <>
                        <NewWidget widget={newWidget} addWidget={addWidget} />
                    </>

                }
            </div>
            {widgets.map(widget=>{
                return(
                    <WidgetDisplaySwitch key={widget.name} widget={widget}/>
                )
            })}
        </>
    )
}