import express, { json, urlencoded } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import router from "./router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

let admin = true;

const isAdmin = (req, res, next) => {
    if (admin){
        next();
    } else {
        res.json({error:-1, desc: `Admin right are needed for route ${req.path} method ${req.method}`})
    }
};

app.use(json());
app.use(urlencoded({extended: true}));

app.use("/api", router);

app.use((req, res) => {
    res.json({error : -2, desc: `Route ${req.path} method ${req.method} doesn't exist`});
});

app.listen(8080, () => {
    console.log("listening on port 8080")
});

app.on("error", (err) => {console.log(err)});