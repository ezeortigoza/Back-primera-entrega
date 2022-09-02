const persistence = "MongoDB";
let usersService;
let cartsService;
switch(persistence){
    case "MEMORY":
        const {default:memUser} = await import ('./memoryDAO/users.js');
        usersService = new memUser();
        const {default:cartsUser} = await import ('../contenedor/carts.js');
        cartsService = new cartsUser();
        break;
    case "MongoDB":
        const {default:mongoUser} = await import ('./mongoDAO/users.js')
        usersService = new mongoUser();
        const {default:cartsUserDB} = await import ('./mongoDAO/carts.js');
        cartsService = new cartsUserDB();
        break;
    case "FILE":
        const {default:fileUser} = await import ('./filesDAO/fileProduct.js');
        usersService = new fileUser();
        const {default:cartsFile} = await import ('./filesDAO/FileCarts.js');
        cartsService = new cartsFile();
        break;
}

const services = {
    usersService,
    cartsService
}
export default services;