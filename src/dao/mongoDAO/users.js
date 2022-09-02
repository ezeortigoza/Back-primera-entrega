import mongoose from "mongoose";
import mongoDBContainer from "./mongoDBContainer.js";
import objectContenedor from "../../contenedor/object.js";

const collection = 'users';
const usersSchema = mongoose.Schema({
    name:String,
    precio:String,
    color:String,
})
export default class users extends mongoDBContainer{
    constructor(){
        super(collection,usersSchema);
    }
}