import crypto from 'crypto';


// Un salt será un "código secreto" para encriptar las contraseñas
const salt = crypto.randomBytes(128).toString('base64')
// console.log('salt: ', salt)

export function encriptar(sinEncriptar) {
    const encriptado = crypto.createHmac('sha256', salt).update(sinEncriptar).digest('hex');
    return encriptado;
}
