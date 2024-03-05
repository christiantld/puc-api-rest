import productList from '../seeds/products.js'
import crypto from 'node:crypto';

export function createProducts(product) {
  const {name,price, stock } = product;
  let {products, lastModified} = productList;

  const newProduct = {
      id: crypto.randomUUID(),
      name,
      price,
      stock,
  };

  products.push(newProduct);
  lastModified = new Date().toISOString();

  return newProduct;
}
