import mongoose from "mongoose";
import mongoDBContainer from "./mongoDBContainer.js";

const collection = 'carts';
const cartsSchema = mongoose.Schema({
    count:Number,
    title:String,
    color:String,
})
export default class users extends mongoDBContainer{
    constructor(){
        super(collection,cartsSchema);
    }
}