import { User } from "./User.js";
import fs from 'fs/promises';
import { encriptar } from "./encriptar.js";


export class UserManager {

    // Con el # hacemos que las clases o métodos sean privados, es decir no sean recomendados por el editor, ni sean visibles, aqui se declaran las clases y a los métodos directamente se les agrega el #

    #users
    #path

    constructor(path) {
        this.#path = path;
        this.#users = [];
    }

    async #getUsers() {
        this.#users = JSON.parse(await fs.readFile(this.#path))
        return this.#users;
    }

    async #writeUsers() {
        fs.writeFile(this.#path, (JSON.stringify(this.#users, null, 2)))
    }

    async createUser({ name, lastName, userName, password }) {
        await this.#getUsers()
        const newUser = new User({ name, lastName, userName, password: encriptar(password) })
        this.#users.push(newUser)
        await this.#writeUsers()
        return newUser;
    }

    async validateUser({ username, password }) {
        await this.#getUsers()
        const user = this.#users.find(u => u.username === username)
        const encriptada = encriptar(password)
        if (user.password === encriptada) {
            console.log('Contraseña Correcta');
            return user;
        } else {
            throw new Error('Credenciales Inválidas');
        }
    }
}