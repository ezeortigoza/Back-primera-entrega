import {Router} from "express";
import { uploader } from "../utils.js";
import objectContenedor from "../contenedor/object.js";
// import carts from "../files/carts.json.js";
import fs from 'fs';
import __dirname from '../utils.js';
import cartContenedor from "../contenedor/carts.js";

const router = Router();
const objectService = new objectContenedor();
let path = __dirname+'/files/carts.json.js'
const cartService = new cartContenedor();


//Obtiene todos los productos
router.get('/products', async (req,res)=>{
    // res.render("Welcome Carlos")
    let productos = await objectService.getAll();
    console.log(productos);
    res.send(productos);
})

router.get('/newObject', (req,res)=>{
    res.render('newObject');
})

router.get('/object',async(req,res)=>{
    let object = await objectService.getAll();
    res.render('object',{
        object,
        name: "Carlos"
    });
})


//Obtiene los productos segun su id
router.get('/:id/products', async (req,res)=>{
   let id = req.params.id
   let productos = await objectService.getById(id);
   console.log(productos);
   res.send(productos);
})

//Recibe o agrega un producto y lo devuelve con su ID
router.post('/',uploader.single('file'), async (req,res)=>{
    console.log(req.file);
    let product = req.body;
    await objectService.save(product);
    console.log(product);
   // product.image = req.file.path
    if(!product.productos) return res.status(400).send({status:'error',error: 'Invalid input' });
    //product.push(objectService);
    res.send({status: "Success", message: "Products added"});
})

//Recibe y actualiza un producto segun su ID
router.put('/:id', async (req,res)=>{
     let id = req.params.id
     let producto = await objectService.actualizar(id);
     console.log(producto);
     res.send(producto);
})

//Elimina un producto segun su ID

router.delete('/:id/products', async (req,res)=>{ 
    let id = req.params.id
    let producto = await objectService.deleteById(id);
    console.log(producto);
    res.send('Producto eliminado');
 
})




//Carrito

   router.post('/:id/carts',async (req,res)=>{
    let body = req.body;
    await cartService.save(body); 

    console.log(id)
    res.send(id);
})   

  router.post('/carts',async (req,res)=>{
    let product = req.body;
    await cartService.Cartsave(product);
    let one  = await cartService.getAll()
    let id =`id: ${one.map(element => element.id)}`; 
     console.log(id);
     res.send(id);
}) 


router.delete('/:id', async(req,res)=>{
    let deleteAll = req.params.id;
    let products = await cartService.deleteAll(deleteAll);
    console.log(products);
    res.send('Todos los productos fueron eliminados');
}) 

router.delete('/carts/:id', async (req,res)=>{
    let id = req.params.id;
    let products = await cartService.deleteById(id);
    console.log(products);
    res.send('Producto eliminado');
})  

router.get('/carts', async(req,res)=>{
  let id = req.body
  let products = await cartService.getAll(id);
  console.log(products);
  res.send(products);
})  

export default router;