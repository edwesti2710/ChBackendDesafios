class ProductManager {
    constructor() {
        this.products = [];
    }
    addProduct(newProduct) {

        if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) {
            return console.log('All fields are required!');
        } else {
            const products = this.getProducts();
            if (products.some(product => product.code === newProduct.code)) {
                return console.log('This product already exists!')
            } else {
                newProduct.id = products.length + 1;
                this.products.push(newProduct);
                console.log('Product was successfully added')
                return newProduct.id;
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