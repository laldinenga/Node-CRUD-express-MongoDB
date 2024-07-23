const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('Hello Node API')
})

app.get('/api', (req, res) => {
    res.send('Hello API Dineng')
})

//GET PRODUCT BY ID
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
        
    }
})

//GET ALL PRODUCT
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
        
    }
})

//CREATE PRODUCT
app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
        
    }
})

//PUT PRODUCT
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message : `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//Delete Product
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message : `cannot find any product with ID ${id}`})
        }
        res.status(200).json(`${product} was deleted successfully`);

        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
 


mongoose.connect('mongodb+srv://admin:abc123456@testnodeapi.xnj8ad4.mongodb.net/Node-API?retryWrites=true&w=majority&appName=TestNodeApi')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, () => {
        console.log("Port open at 3000")
    })
   
}).catch((error) =>{
    console.log(error)
})

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://admin:<password>@testnodeapi.xnj8ad4.mongodb.net/?retryWrites=true&w=majority&appName=TestNodeApi";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);