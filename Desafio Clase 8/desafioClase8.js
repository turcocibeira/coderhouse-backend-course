import express, { json, urlencoded } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import router1 from "./router1.js";
import router2 from "./router2.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(json());
app.use(urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.use("/api", router1);
app.use("/api", router2);

app.listen(3000, () => {
    console.log("listening on port 3000")
});

app.on("error", (err) => {console.log(err)});