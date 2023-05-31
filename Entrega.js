const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.products = [];
    this.productIdCounter = 1;
    this.path = path;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        const lastProduct = this.products[this.products.length - 1];
        this.productIdCounter = lastProduct.id + 1;
      }
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  saveProducts() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.path, data);
      console.log('Productos guardados exitosamente.');
    } catch (error) {
      console.error('Error al guardar los productos:', error);
    }
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error("Error: Todos los campos son obligatorios.");
      return;
    }

   
    if (this.products.find(p => p.code === product.code)) {
      console.error("Error: El código del producto ya existe.");
      return;
    }

   
    product.id = this.productIdCounter++;
    this.products.push(product);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      console.error("Error: Producto no encontrado.");
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      console.error("Error: Producto no encontrado.");
      return;
    }
    this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
    this.saveProducts();
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      console.error("Error: Producto no encontrado.");
      return;
    }
    this.products.splice(productIndex, 1);
    this.saveProducts();
  }
}


const productManager = new ProductManager('ruta/archivo_productos.json');


const product1 = {
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 10.99,
  thumbnail: "imagen1.jpg",
  code: "P001",
  stock: 5
};
productManager.addProduct(product1);


const product2 = {
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 19.99,
  thumbnail: "imagen2.jpg",
  code: "P002",
  stock: 3
};
productManager.addProduct(product2);


const products = productManager.getProducts();
console.log(products);


const productId = 1;
const product = productManager.getProductById(productId);
console.log(product);


const invalidProductId = 99;
const invalidProduct = productManager.getProductById(invalidProductId);


const productIdToUpdate = 1;
const updatedFields = {
  title: "Producto 1 actualizado",
  price: 15.99,
  stock: 10
};
productManager.updateProduct(productIdToUpdate, updatedFields);


const productIdToDelete = 2;
productManager.deleteProduct(productIdToDelete);
