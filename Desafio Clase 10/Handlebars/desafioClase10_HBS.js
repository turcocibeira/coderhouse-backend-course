import express, { json, urlencoded } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import router1 from "./router1.js";
import { engine } from "express-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.engine(
    "hbs", 
    engine({
        extname: ".hbs",
        defaultLayout: join(__dirname, "views/layouts/main.hbs"),
        layoputsDir: join(__dirname, "views/layouts/"),
        partialsDir: join(__dirname, "views/partials")
    })
);

app.set("view engine", "hbs");
app.set("views", join(__dirname, "/views"))

app.use(json());
app.use(urlencoded({extended: true}));

app.use("/", router1);

app.listen(3000, () => {
    console.log("listening on port 3000")
});

app.on("error", (err) => {console.log(err)});