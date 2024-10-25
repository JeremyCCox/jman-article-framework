import { FormEvent } from "react"
import { WidgetType } from "./WidgetsPanel"

export default function NewWidget({widget,addWidget}:Readonly<{ widget: WidgetType, addWidget:(widget:WidgetType)=>void }>){
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        let newWidget = Object.assign({},widget);
        newWidget.id =crypto.randomUUID()
        widget.parameters.map(param=>{
            newWidget.values[param] = e.currentTarget[param].value
        })
        addWidget(newWidget)
    }

    return(
        <form onSubmit={handleSubmit} className={'grid text-amber-100 justify-evenly'}>

            {widget && widget.parameters.map(param=>{
                return(
                    <label key={param}>
                        {param}
                        <input className={'bg-gray-700 px-2'} type={'text'} id={param}/>
                    </label>
                )
            })}
            <button className={'border m-1 w-fit '}>
                Add Widget
            </button>
        </form>
    )
}