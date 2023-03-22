import { encriptar } from './encriptar.js';
import { UserManager } from './UserManager.js';
import colors from 'colors';

const um = new UserManager('./database/usuarios.json')
// const user = await um.createUser({
//     name: 'edward',
//     lastName: 'espinoza',
//     userName: 'edward1',
//     password: 'mipass'
// })

// console.log(user);
// console.log(await encriptar('mipass'));
const loggedUser = await um.validateUser({
    userName: 'edward1',
    password:'mipass'
})
// console.log(colors.magenta('fin'))