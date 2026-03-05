const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

/* Replace with your MongoDB Atlas connection string */
mongoose.connect(
"mongodb+srv://username:password@cluster0.mongodb.net/productDB?retryWrites=true&w=majority"
)
.then(()=>console.log("MongoDB Atlas Connected"))
.catch(err=>console.log(err));

/* Schema */
const ProductSchema = new mongoose.Schema({
    name:String,
    price:Number,
    stock:Number
});

const Product = mongoose.model("Product",ProductSchema);

/* POST Route */
app.post("/addProduct",async(req,res)=>{
    const product = new Product(req.body);
    await product.save();
    res.send("Product Added");
});

/* PATCH Route (update stock) */
app.patch("/updateStock/:id",async(req,res)=>{
    await Product.findByIdAndUpdate(req.params.id,{
        stock:req.body.stock
    });
    res.send("Stock Updated");
});

/* DELETE Route */
app.delete("/deleteProduct/:id",async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.send("Product Deleted");
});

/* GET */
app.get("/products",async(req,res)=>{
    const data = await Product.find();
    res.json(data);
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});