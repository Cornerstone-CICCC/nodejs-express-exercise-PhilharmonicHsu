import express from 'express';
import dotenv from 'dotenv';
import productsRouter from './routes/products.routes'
dotenv.config();

const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/products", productsRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} ....`)
})