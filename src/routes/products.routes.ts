import { Router, Request, Response } from 'express'
import { Product } from '../types/product'
import { v4 as uuidv4 } from 'uuid'

const productRouter = Router()

const products: Product[] = [];

productRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json(products)
})

productRouter.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const user = products.find(user => user.id === id)
  if (!user) {
    res.status(404).send("User not found")
    return
  }
  res.status(200).json(user)
})

productRouter.post("/", (req: Request<{}, {}, Omit<Product, 'id'>>, res: Response) => {
  const newUser: Product = {
    id: uuidv4(),
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price
  }
  products.push(newUser)

  res.status(201).json(newUser)
})

productRouter.put("/:id", (req: Request<{ id: string }, {}, Partial<Product>>, res: Response) => {
  const { id } = req.params
  const foundIndex = products.findIndex(user => user.id === id)
  if (foundIndex === -1) {
    res.status(404).send("Product not found")
    return
  }
  const updatedProduct: Product = {
    ...products[foundIndex],
    product_price: req.body.product_price ?? products[foundIndex].product_price,
  }
  products[foundIndex] = updatedProduct
  res.status(200).json(updatedProduct)
})

productRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const foundIndex = products.findIndex(user => user.id === id)
  if (foundIndex === -1) {
    res.status(404).send("Product not found")
    return
  }
  products.splice(foundIndex, 1)
  res.status(200).send("Product was deleted!")
})

export default productRouter