import fs from 'fs';
import __dirname from '../utils.js'


let path = __dirname+'/files/carts.json'

class cartContenedor{

    constructor(){
        this.path = __dirname+'/files/carts.json'
    }
    getAll = async() =>{
        try{
          if(fs.existsSync(this.path)){
              let fileData = await fs.promises.readFile(this.path,'utf-8');
              let articulo = JSON.parse(fileData);
             return articulo;
          }else{
              return [];//No tiene mascotas
          }
        } catch(error){
          console.log('Error de lectura'+ error)
        }
  }

    Cartsave = async (article,timestamp) =>{
        try{
            let products = await this.getAll();
            if(products.length === 0){
                timestamp = Date.now();
                let day = new Date(timestamp); 
                article.id = 1;
                products.push(article);
                products.push(day);
                await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'));
            }else{//Cuando hay mas mascotas
                article.id = products[products.length-1].id+1;
                products.push(article);
                await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'));
            }

        }catch(error){
            console.log('No se pudo leer el archivo' + error);
        }
    }

    deleteById = async (id)=>{
        try {
            let data = await this.getAll();
            const borrar = data.filter(object => object.id != id)
            await fs.promises.writeFile(path,JSON.stringify(borrar,null,'\t'));
            return borrar
            }
        catch (error) {
            console.log('Hay un error'+ error);
        }
    }

    deleteAll = async (deleteAll) =>{
        try{
            const data = await this.getAll();
            let borrar = data.filter((element) =>{
                element.id !== deleteAll;
            })
            await fs.promises.writeFile(path,JSON.stringify(borrar,null,'\t'));
            console.log("Todos los objetos fueron eliminados :" + JSON.stringify((data)));

        }catch(error){
            console.log('Hay un error' + error);
        }
    }
   









}

export default cartContenedor