import { Router } from "express";
import PersistanceHandler from "./persistence.js"

const router = Router();

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
    .post(async (req, res) => {
        const { name, description, code, picURL, price, stock } = req.body;

        if (!name || !description || !code || !picURL || !price || !stock) {
            res.status(400).send("Please enter all data correctly.");
            return;
        };

        let timestamp = Date.now();
        const id = await prodsStore.save({ timestamp, name, description, code, picURL, price, stock })

        res.status(201).json({ name, description, code, picURL, price, stock, id })
    })
    .put(async (req, res) => {
        if (req.params.id) {
            res.send("break")
        } else {
            res.status(400).send("Please enter a valid id to edit.");
            return;
        }
    })
    .delete(async (req, res) => {
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

    });

router
    .route("/cart/:id/products/:id_prod")
    .delete(async (req, res) => {

    });

export default router;