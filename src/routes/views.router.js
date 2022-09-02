import {Router} from "express";
import { uploader } from "../utils.js";
import objectContenedor from "../contenedor/object.js";
// import carts from "../files/carts.json.js";
import __dirname from '../utils.js';
import cartContenedor from "../contenedor/carts.js";
import services from "../dao/index.js";
const isAdmin = true;


const router = Router();
const objectService = new objectContenedor();
let path = __dirname+'/files/carts.json.js'
const cartService = new cartContenedor();

//DAO MEMORY, FILE y MongoDB
router.get('/users/:id',async(req,res)=>{
  let id = req.params.id;
  let results = await services.usersService.deleteById(id);
  res.send(results);
})
router.get('/users',async(req,res)=>{
  let results = await services.usersService.getAll();
  res.send(results);
})
router.get('/users',async(req,res)=>{
  let results = await services.usersService.getById();
  res.send(results);
})
router.delete('/users/:id',async(req,res)=>{
  let id = req.params.id;
  let results = await services.usersService.deleteById(id);
  console.log(results)
  res.send(results)
})
router.post('/users',async(req,res)=>{
  let results = await services.usersService.save(req.body);
  res.send(results);
})
router.post('/usersCarts',async(req,res)=>{
  let results = await services.cartsService.Cartsave(req.body);
  res.send(results);
})
router.post('/usersCartsDB',async(req,res)=>{
  let results = await services.cartsService.save(req.body);
  res.send(results);
})
router.get('/usersDB',async(req,res)=>{
  let results = await services.cartsService.getAll();
  res.send(results);
})




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
     let id = req.params.body
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


//POST Para incorporar productos al listado (solo administradores)
router.post('/admin', async (req,res)=>{
    if(isAdmin){
        if(!res.body){
            const name = req.body.name;
            const image = req.body.image;
            const color = req.body.color;
            try{
                objectService.save(name,image,color);
                res.json({
                    desc: `Producto creado exitosamente`,
                    status: `200 OK`  
                });
            }catch(ex){
                console.log(ex);
            }
        }
        }else{
          res.json(
              { 
                error: `403 Forbidden`, 
                desc: `POST reservado para admins` ,
                status : 403
              });
    }
})

//PUT '/:id' Actualiza producto por id solo para administradores

router.put('/admin/:id', async (req,res)=>{
    if(isAdmin){
        if(!(res.body)){
            const id = parseInt(req.params.id);
            const name = req.body.name;
            const image = req.body.image;
            const color = req.body.color;

            try{
                const update = await objectService.actualizar(id,name,color,image);
                update ? res.json(
                    {
                      desc: `Producto modificado exitosamente`,
                      status:`200 OK`
                    }
                  ) : res.json(
                    {
                      error: `404 Not Found`, 
                      desc: `No encontramos el producto a modificar`,
                      status : 404
                    });
            } catch (ex) {
                console.error(ex);
              }
        }else{
            res.json(
                      { 
                        error: `412 Precondition Failed`, 
                        desc: `POST requiere campos : Nombre , Descripcion, Foto y precio` ,
                        status: 412
                      });
          }      
        } else {
          res.json(
                    {
                      error: `403 Forbidden`, 
                      desc: `PUT reservado para admins` ,
                      status : 403
                    });
    }
})


//DELETE '/:id' Borra un producto segun su id solo admnistradores
router.delete('/:id',async (req,res)=>{
    if(isAdmin){
        try{
            const isDeleted = await objectService.deleteById(req.params.id);
            isDeleted ? res.json(
                {
                  desc: `Producto eliminado exitosamente`, 
                  status: `200 OK`
                }) : 
                res.json(
                  {
                    error: 404, 
                    desc: `No encontramos el producto que busca eliminar...`,
                    status :404
                  });
        }catch (ex){
                console.log(ex);

        }
    }else{
        res.json(
            {
              error: `403 Forbidden`, 
              desc: `DELETE reservado para admins` ,
              status: 403

            });
    }
    
})



//Carrito

   router.post('/:id/carts',async (req,res)=>{
    let body = req.body;
    let id = await cartService.save(body); 
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