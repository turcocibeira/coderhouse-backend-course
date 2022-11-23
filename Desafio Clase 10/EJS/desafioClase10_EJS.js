import express, { json, urlencoded } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import router1 from "./router1.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", join(__dirname, "/views"))

app.use(json());
app.use(urlencoded({extended: true}));

app.use("/", router1);

app.listen(3000, () => {
    console.log("listening on port 3000")
});

app.on("error", (err) => {console.log(err)});