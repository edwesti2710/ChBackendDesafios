import crypto from 'crypto';
import { SALT } from './config';

function createSalt(){
    // Salt es código secreto para encriptar las contraseñas
    const salt = crypto.randomBytes(128).toString('base64')
    return salt;
}
// console.log(salt);
export function encriptar(text) {
    const encriptado = crypto.createHmac('sha256', SALT).update(text).digest('hex');
    return encriptado;
}
