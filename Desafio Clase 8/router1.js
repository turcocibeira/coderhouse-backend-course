import { Router } from "express";
import Contenedor from "../Desafio Clase 4/desafioClase4.js"

const router = Router();

const cont1 = new Contenedor("productos");

router
    .route("/productos")
    .get(async (req, res) => {
        res.status(200).send(await cont1.getAll())
    })
    .post(async (req, res) => {
        const { title, price, thumbnail } = req.body;

        if (!title || !price || !thumbnail) {
            res.status(400).send("Please enter all data correctly");
            return;
        }

        const id = await cont1.save({ title, price, thumbnail })

        res.status(201).json({ title, price, thumbnail, id })
    })

export default router;