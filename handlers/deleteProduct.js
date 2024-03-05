import productList from '../seeds/products.js'

export function deleteProduct(id) {
  let {products, lastModified} = productList;
  const index = products.findIndex((p) => p.id === +id);
  if (index === -1) {
    return null;
  }
  const deletedProduct = products.splice(index, 1);
  lastModified = new Date().toISOString();
  return deletedProduct;
}