import express, { json } from "express";
import cors from "cors";
import apicache from 'apicache'
import redis from 'redis';
import { listProducts, createProducts, updateProduct, deleteProduct, showProduct } from "./handlers/index.js"

const app = express();
const cacheWithRedis = apicache.options({redisClient: redis.createClient()}).middleware

const onlyStatus200 = (req, res) => res.statusCode === 200
const cacheSuccess = cacheWithRedis('5 minutes', onlyStatus200)
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({
    message: "Check path /products to see the list of products",
  })
})

app.get("/products", cacheSuccess, (req, res) => {
  const {products, lastModified} = listProducts()
  res.setHeader("Last-Modified", lastModified);
  return res.json(products);
})

app.get("/products/:id", cacheSuccess, (req, res) => {
    const {product, lastModified} = showProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.setHeader("Last-Modified", lastModified);
    return res.json(product);
})

app.post("/products",(req, res) => {
  const product = req.body;
  const newProduct = createProducts(product);
  return res.status(201).json({
    message: "Product created",
  });
})

app.put("/products/:id",(req, res) => {
  const id = req.params.id;
  const product = req.body;
  const updatedProduct = updateProduct(id, product);
  if (!updatedProduct) {
   return res.status(404).json({ message: "Product not found" });
  }
  return res.status(200).json({
    message: "Product updated",
  })
})

app.delete("/products/:id",(req, res) => {
  const id = req.params.id;
  const deletedProduct = deleteProduct(id);
  if (!deletedProduct) {
   return res.status(404).json({ message: "Product not found" });
  }
 return res.status(200).json({
    message: "Product deleted",
  })
})


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
