import { promises as fs } from 'fs';
import * as normalizr from 'normalizr';
import * as util from 'util';

const normalize = normalizr.normalize
const schema = normalizr.schema;

const nameSchema = new schema.Entity('name')
const emailSchema = new schema.Entity('email')
const dateSchema = new schema.Entity('date')
const messageSchema = new schema.Entity('message')
const userIdSchema = new schema.Entity('userId')
const messageIdSchema = new schema.Entity('messageId')
const authorSchema = new schema.Entity('author', {
    id: userIdSchema,
    name: nameSchema,
    mail: emailSchema
})
const commentSchema = new schema.Entity('comment', {
    messageId: messageIdSchema,
    message: messageSchema,
    date: dateSchema
})
const postSchema = new schema.Entity('post', {
    author: authorSchema,
    messages: [commentSchema]
})

class FSContainer {
    constructor(route) {
        this.route = route
    }
    async save(mensaje) {
        const mensajes = await this.getAll()
        mensajes.push(mensaje)
        try {
            await fs.writeFile(this.route, JSON.stringify(mensajes, null, 2))
            return console.log('Guardado exitoso')
        } catch (error) {
            console.error('Error de escritura')
            return console.error(error)
        }
    }
    async getAll() {
        try {
            let messages = await fs.readFile(this.route, 'utf-8')
            return JSON.parse(messages)
        } catch (error) {
            console.error('Error de lectura.')
            console.error(error)
            return []
        }
    }
    getTime() {
        let today = new Date();
        return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + "  " + today.getHours() + ":" + today.getMinutes()
    }
    async normalize() {
        const mensajes = await this.getAll()
        const normalizedData = normalize(mensajes, postSchema)
        console.log(util.inspect(normalizedData, false, 12, true))
    }
}
export default FSContainer;