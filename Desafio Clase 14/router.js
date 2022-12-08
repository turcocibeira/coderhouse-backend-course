import { Router } from "express";
import PersistanceHandler from "./persistence.js"

const router = Router();

// Check if user is admin middleware
let admin = false;

const isAdmin = (req, res, next) => {
    if (admin){
        next();
    } else {
        res.json({error:-1, desc: `Admin right are needed for route ${req.path} method ${req.method}`})
    }
};

// Routes for products
const prodsStore = new PersistanceHandler("products");

router
    .route("/products/:id?")
    .get(async (req, res) => {
        if (req.params.id) {
            res.status(200).send(await prodsStore.getById(req.params.id))
        } else {
            res.status(200).send(await prodsStore.getAll())
        }
    })
    .post(isAdmin, async (req, res) => {
        const { name, description, code, picURL, price, stock } = req.body;

        if (!name || !description || !code || !picURL || !price || !stock) {
            res.status(400).send("Please enter all data correctly.");
            return;
        };

        let timestamp = Date.now();
        const id = await prodsStore.save({ timestamp, name, description, code, picURL, price, stock })

        res.status(201).json({ name, description, code, picURL, price, stock, id })
    })
    .put(isAdmin, async (req, res) => {
        if (req.params.id) {
            res.status(200).send(await prodsStore.updateById(req.params.id, req.body));
        } else {
            res.status(400).send("Please enter a valid id to edit.");
            return;
        }
    })
    .delete(isAdmin, async (req, res) => {
        if (req.params.id) {
            res.status(200).send(await prodsStore.deleteById(req.params.id))
        } else {
            res.status(400).send("Please enter a valid id to delete.");
            return
        }
    });

// Routes for carts
const cartStore = new PersistanceHandler("carts");

router
    .route("/cart/:id?")
    .post(async (req, res) => {
        let timestamp = Date.now();
        const id = await cartStore.save({ timestamp, products: []})
        res.status(201).json({msg: `Cart ${id} created`})
    })
    .delete(async (req, res) => {
        if (req.params.id) {
            res.status(200).send(await cartStore.deleteById(req.params.id))
        } else {
            res.status(400).send("Please enter a valid id to delete.");
            return
        }
    });

router
    .route("/cart/:id/products")
    .get(async (req, res) => {
        const cart = await cartStore.getById(req.params.id);
        res.status(200).send(cart.products)
    })
    .post(async (req, res) => {
        let cartId = req.params.id;
        const prod = await prodsStore.getById(req.body.id);
        if (req.body.id && prod != null) {
            res.status(200).send(await cartStore.addProdToCart(prod, cartId))
        } else {
            res.status(400).send("Please enter a valid Cart/Product ID to add.");
        }
    });

router
    .route("/cart/:id/products/:id_prod")
    .delete(async (req, res) => {
        let cartId = req.params.id;
        let prodId = req.params.id_prod;
        res.status(200).send(await cartStore.deleteProdInCart(prodId, cartId))
    });

export default router;