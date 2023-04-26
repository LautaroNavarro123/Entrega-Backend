class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(product) {
      // Validar que todos los campos sean obligatorios
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.error("Error: Todos los campos son obligatorios.");
        return;
      }
  
      // Validar que no se repita el campo "code"
      if (this.products.find(p => p.code === product.code)) {
        console.error("Error: El código del producto ya existe.");
        return;
      }
  
      // Asignar un id autoincrementable al producto
      product.id = this.productIdCounter++;
      this.products.push(product);
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
  }
  
  // Crear una instancia de la clase ProductManager
  const productManager = new ProductManager();
  
  // Crear un nuevo producto
  const product1 = {
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 10.99,
    thumbnail: "imagen1.jpg",
    code: "P001",
    stock: 5
  };
  productManager.addProduct(product1);
  
  // Crear otro producto
  const product2 = {
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 19.99,
    thumbnail: "imagen2.jpg",
    code: "P002",
    stock: 3
  };
  productManager.addProduct(product2);
  
  // Obtener todos los productos
  const products = productManager.getProducts();
  console.log(products);
  
  // Obtener un producto por id
  const productId = 1;
  const product = productManager.getProductById(productId);
  console.log(product);
  
  // Intentar obtener un producto con un id inválido
  const invalidProductId = 99;
  const invalidProduct = productManager.getProductById(invalidProductId);
