import productList from '../seeds/products.js'

export function updateProduct(id, product) {
  let {products, lastModified} = productList;
  const index = products.findIndex((p) => p.id === +id);
  if (index === -1) {
    return null;
  }
  products[index] = { ...products[index], ...product };
  lastModified = new Date().toISOString();
  return products[index];
}