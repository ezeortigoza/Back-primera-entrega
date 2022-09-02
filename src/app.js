import express from "express";
import __dirname from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import objectRouter from './routes/object.router.js';
import mongoose from "mongoose";


const app = express();
const server = app.listen(8080,() => console.log("Listening on 8080"));
mongoose.connect('mongodb://127.0.0.1/basePrueba');
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.use('/',viewsRouter);
app.use('/api/product',objectRouter);
