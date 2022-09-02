import mongoose from "mongoose";
import objectContenedor from "../../contenedor/object.js";



export default class mongoDBContainer{
    constructor(collection,schema){
        mongoose.connect('mongodb://127.0.0.1/basePrueba')
        this.model = mongoose.model(collection,schema);

    }
    getAll = async () =>{
        let results = await this.model.find();
        return results;
    }
    save = async(document) =>{
        let results = await this.model.create(document);
        return results;
    }
    delete = async(document) =>{
        let results = await this.model.deleteOne(document);
        return results;
    }
    update = async(document) =>{
        let results = this.model.updateOne(document);
        return results
    }

}