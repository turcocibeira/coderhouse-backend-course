import { Router } from "express";
import Contenedor from "../Desafio Clase 4/desafioClase4.js";

const router = Router();

const cont1 = new Contenedor("productos");

router
    .route("/")
    .get((req, res) => {
        res.render("inputForm")
    })

router
    .route("/api/productos")
    .post(async (req, res) => {
        const { title, price, thumbnail } = req.body;

        if (!title || !price || !thumbnail) {
            res.status(400).send("Please enter all data correctly");
            return;
        }

        const id = await cont1.save({ title, price, thumbnail })

        res.status(201).redirect("/")
    });



export default router;