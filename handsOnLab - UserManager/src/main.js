import { UserManager } from './UserManajer.js';
import { User } from './User.js';

const um = new UserManager('./database/usuarios.json');
const user = await um.crearUsuario({
    nombre: 'marian',
    apellido: 'aquino',
    username: 'marian',
    password: '123456'
})

// console.log(user);
// um.loguear
const loggear = await um.loguear({
    username: 'marian',
    password: '123456'
})
console.log(loggear);