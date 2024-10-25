import mongoose from "mongoose";
import {WidgetType} from "../../widgets/WidgetsPanel";
const {Schema, model}= mongoose;
interface Article{
    _id:string,
    title?:string,
    imgSrc?:string,
    imgAlt?:string,
    imgDesc?:string,
    description?:string,
    category?:string,
    bodyHTML?:string,
    published:boolean,
    widgets?:WidgetType,
    template?:string,
    creationDate?:mongoose.Date,
    lastUpdate?:mongoose.Date,
}

const articleSchema= new Schema<Article>({
    title:String,
    description:String,
    imgSrc:String,
    imgAlt:String,
    imgDesc:String,
    category:String,
    bodyHTML:String,
    published:{type:Boolean,default:false},
    widgets:[{
        id:String,
        name:String,
        component:String,
        parameters:[String],
        values:{type:Map,of:String},
    }],
    template:Number,
    creationDate: {type:Date,default:Date.now},
    lastUpdate: {type:Date,default:Date.now},
})
const Article = mongoose.models.Article||model("Article",articleSchema)
export default Article