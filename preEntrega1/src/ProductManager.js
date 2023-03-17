import fs from 'fs/promises'
import crypto from 'crypto'

export class ProductManager {
    constructor(path) {
        this.path = path
    }
    async getProducts() {
        try {
            const db = await fs.readFile(this.path)
            return await JSON.parse(db)
        } catch (error) {
            console.error(`Error reading file ${this.path}: ${error}`)
            throw error
        }
    }
    async addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.status || !product.category || !product.code || !product.stock) {
            throw new Error('All fields are required')
        } else {
            const allProducts = await this.getProducts();
            const newProduct = {
                title: product.title,
                description: product.description,
                price: product.price,
                status: product.status || true,
                category: product.category,
                thumbnail: product.thumbnail || [],
                code: product.code,
                stock: product.stock
            }
            if (allProducts.find(product => product.code === newProduct.code)) {
                throw new Error('Product code already exists')
            } else {
                newProduct.id = crypto.randomUUID();
                allProducts.push(newProduct)
                await fs.writeFile(this.path, JSON.stringify(allProducts, null, 2))
                return newProduct
            }
        }
    }
    async getProductByID(id) {
        const allProducts = await this.getProducts();
        return allProducts.find(product => product.id === id) || null;
    }
    async updateProduct(id, newProps) {
        const allProducts = await this.getProducts();
        const productIndex = allProducts.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            allProducts[productIndex] = { ...allProducts[productIndex], ...newProps };
            await fs.writeFile(this.path, JSON.stringify(allProducts, null, 2))
            console.log('Changes has been changed succesfully');
            return allProducts[productIndex];
        } else {
            throw new Error('This product does not exist');
        }
    }
    async deleteProduct(id) {
        const allProducts = await this.getProducts();
        const productIndex = allProducts.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            const deletedProduct = allProducts[productIndex];
            allProducts.splice(productIndex, 1);
            await fs.writeFile(this.path, JSON.stringify(allProducts, null, 2))
            console.log('This product has been deleted');
            return deletedProduct;
        } else {
            throw new Error('This product does not exist');
        }
    }
}

// productManager.addProduct({title: 'edward3', description: 'edward3', price: 30, thumbnail: 'img3', code: '33', stock: '303'})
// const productManager = new ProductManager('./static/db.txt')
// console.log(await productManager.getProducts())
// productManager.addProduct({
//     title: 'producto prueba',
//     description: 'Este es un producto prueba',
//     price: 200,
//     thumbnail: 'Sin imagen',
//     code: 'abc123',
//     stock: 50
// });
// productManager.addProduct({
//     title: 'producto prueba 2',
//     description: 'Este es un producto prueba 2',
//     price: 200,
//     thumbnail: 'Sin imagen',
//     code: 'abc1234',
//     stock: 50
// });
// productManager.deleteProduct(2)
// console.log(productManager.getProducts());

// productManager.getProductById(2);