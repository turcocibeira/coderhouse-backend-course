import { Router } from "express";
import Contenedor from "../Desafio Clase 4/desafioClase4.js"

const router = Router();

const cont1 = new Contenedor("productos");

router
    .route("/productos/:id")
    .get(async (req, res) => {
        let id = parseInt(req.params.id);
        const prod = await cont1.getById(id);

        if (!prod) {
            res.status(400).json({error:"producto not found"})
        }

        res.status(200).json(prod)
    })
    .put(async (req, res) => {
        let id = parseInt(req.params.id);
        const { title, price, thumbnail } = req.body;

        const prodUpdate = await cont1.updateById(title, price, thumbnail, id);

        if (!prodUpdate || !title || !price || !thumbnail) {
            res.status(400).send("Couldn't update, check that all info is correct");
            return;
        }

        res.status(200).send("Updated ok")
    })
    .delete(async (req, res) => {
        let id = parseInt(req.params.id);
        await cont1.deleteById(id);

        res.status(200).send("product deleted");
    });

export default router;