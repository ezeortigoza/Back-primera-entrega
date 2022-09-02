//import memoryContainer from "./memory.container.js";
import objectContenedor from "../../contenedor/object.js";

export default class fileProduct extends objectContenedor{
    constructor(){
        super('/files/object.json')
    }
};