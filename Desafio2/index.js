import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }
    addProduct(newProduct) {

        if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) {
            return console.log('All fields are required!');
        } else {
            const products = this.getProducts();
            const nuevoProducto = {
                title: newProduct.title,
                description: newProduct.description,
                price: newProduct.price,
                thumbnail: newProduct.thumbnail,
                stock: newProduct.stock,
                code: newProduct.code,
                id: products.length + 1
            }
            if (products.some(product => product.code === nuevoProducto.code)) {
                return console.log('This product already exists!')
            } else {
                products.push(nuevoProducto);
                fs.writeFileSync(this.path, JSON.stringify(products));
                console.log('Product was successfully added')
                return nuevoProducto;
            }
        }
    }
    getProducts() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        }
        const products = fs.readFileSync(this.path);
        console.log(products);
        return JSON.parse(products);
    }
    getProductById(id) {
        const products = this.getProducts();
        let desiredProduct = products.find(product => product.id === id)
        return desiredProduct ? console.log(desiredProduct) : console.log('Not Found');
    }
    updateProduct(id, newData) {
        const products = this.getProducts();
        const productIndex = products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            products[productIndex] = { ...newData, id };
            fs.writeFileSync(this.path, JSON.stringify(products));
            console.log('Changes has been changed succesfully');
            return products[productIndex];
        }
        throw 'Product to update was not found';
    }
    deleteProduct(id) {
        const products = this.getProducts();
        const productIndex = products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            fs.writeFileSync(this.path, JSON.stringify(products));
            console.log('The product was disposed of correctly');
            return null;
        }
        throw 'Product to be removed was not found';
    }
}

// TESTING
// const productManager = new ProductManager('./products.json');

// console.log(productManager.getProducts())

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