import productList from '../seeds/products.js'

export function showProduct(id) {
  const {products, lastModified } = productList;
  return {
    product: products.find((p) => p.id === +id),
    lastModified
  }

}