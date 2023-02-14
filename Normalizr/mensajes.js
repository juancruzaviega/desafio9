import { normalize, schema } from "normalizr";

export const chats = {}

const name = new schema.Entity('name')
const message = new schema.Entity('message')
const userId = new schema.Entity('id')
const author = new schema.Entity('author', {
    id: userId,
    name: name,
})
const comment = new schema.Entity('comment', {
    message: message,
})
export const postChat = new schema.Entity('post', {
    author: author,
    messages: [comment]
})

const normalizedData = normalize(chats, postChat)
console.log(normalizedData, null, '\t');
console.log(`Longitud normalize: ${JSON.stringify(normalizedData).length}`);

export default normalizedData