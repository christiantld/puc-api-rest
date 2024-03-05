import express, { json } from "express";
import cors from "cors";
import apicache from 'apicache'
import { listProducts, createProducts, updateProduct, deleteProduct, showProduct } from "./handlers/index.js"

const app = express();
let cache = apicache.middleware('2 minutes')
app.use(cors());
app.use(json());

app.get("/", cache, (req, res) => {
  res.json({
    message: "Check path /products to see the list of products",
  })
})

app.get("/products", cache, (req, res) => {
  const {products, lastModified} = listProducts()
  res.setHeader("Last-Modified", lastModified);
  res.json(products);
})

app.get("/products/:id", cache, (req, res) => {
    const {product, lastModified} = showProduct(req.params.id);
    res.setHeader("Last-Modified", lastModified);
    if (!product) {
     return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
})

app.post("/products",(req, res) => {
  const product = req.body;
  const newProduct = createProducts(product);
  res.status(201).json({
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
  res.status(200).json({
    message: "Product updated",
  })
})

app.delete("/products/:id",(req, res) => {
  const id = req.params.id;
  const deletedProduct = deleteProduct(id);
  if (!deletedProduct) {
   return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({
    message: "Product deleted",
  })
})


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
