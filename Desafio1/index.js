class ProductManager {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            throw new Error('Todos los campos son requeridos')
        } else {
            const allProducts = this.getProducts();
            const newProduct = {
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock
            }
            if (allProducts.find(product => product.code === newProduct.code)) {
                throw new Error('El producto ya existe')
            } else {
                newProduct.id = allProducts.length + 1;
                this.products.push(newProduct);
            }
        }
    }
    getProducts() {
        return this.products;
    }
    getProductById(id){
        const allProducts = this.getProducts();
        return allProducts.find(product => product.id === id) || 'NO existe el producto'
    }
}

const productManager = new ProductManager();
productManager.addProduct({ title: 'producto1', description: 'description1', price: 11, thumbnail: 'img1', code: '111', stock: 11 });
productManager.addProduct({ title: 'producto2', description: 'description2', price: 22, thumbnail: 'img2', code: '222', stock: 22 });
console.log(productManager.getProducts());
console.log(productManager.getProductById(2))