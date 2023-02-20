class ProductManager {
    constructor() {
        this.products = [];
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
                this.products.push(nuevoProducto);
                console.log('Product was successfully added')
                return nuevoProducto.id;
            }
        }
    }
    getProducts() {
        return this.products;
    }
    getProductById(id) {
        const products = this.getProducts();
        let desiredProduct = products.find(product => product.id === id)
        return desiredProduct ? console.log(desiredProduct) : console.log('Not Found');
    }
}

// TESTING
// const productsManager = new ProductManager();

// console.log(productsManager.getProducts())

// productsManager.addProduct({
//     title: 'producto prueba',
//     description: 'Este es un producto prueba',
//     price: 200,
//     thumbnail: 'Sin imagen',
//     code: 'abc123',
//     stock: 25
// });

// console.log(productsManager.getProducts());

// productsManager.getProductById(2);