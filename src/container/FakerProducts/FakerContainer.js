import { faker } from '@faker-js/faker'
import { promises as fs } from 'fs'

class FakerContainer {
    createOne() {
        return {
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(1000, 10000),
            src: faker.image.imageUrl()
        }
    }
    createMany(n) {
        return Array.from({ length: n }, () => this.createOne())
    }
}
export default FakerContainer