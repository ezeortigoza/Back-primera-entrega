export default class memoryContainer{
    constructor(){
        this.data = []
    }
    getAll = () =>{
        return this.data;
    }
    save = (element) =>{
        this.data.push(element);
        return element;
    }
}