import cartContenedor from "../../contenedor/carts.js"

export default class fileCarts extends cartContenedor{
    constructor(){
        super('/files/carts.json')
    }
};