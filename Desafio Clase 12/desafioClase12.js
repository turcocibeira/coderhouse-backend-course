import express, { json, urlencoded } from "express";
import { Server as IOServer } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import router1 from "./router1.js";
import { engine } from "express-handlebars";
import fs from "fs";
import Contenedor from "../Desafio Clase 4/desafioClase4.js";


// Container class to save messages on messages.txt
class msgContainer {

    constructor(fileName){
        this.fileName = fileName;
    }

    async saveMsg(object){

        const file = await fs.promises.readFile(`./${this.fileName}.txt`, "utf-8");
        let fileParse = JSON.parse(file)

        try{
            fileParse.push(object);
            await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(fileParse,null,2))
        }
        catch(err){
            console.log("There was an error saving the message")
        }
    };

    async readMsg(object){
        try {
            const file = await fs.promises.readFile(`./${this.fileName}.txt`, "utf-8")
            return JSON.parse(file)
        }
        catch(err){
            console.log("There was an error reading the file.")
        }
    }
};

// Container class for fetching products from products.txt
const cont1 = new Contenedor("productos");

const chatMsgs = new msgContainer("messages");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const messages = [{mail:"test@test.com", message:"this is a test message", date:"2022-11-30T18:43:35.880Z"}];

const app = express();

app.use(express.static(__dirname + "/public"));

app.engine(
    "hbs", 
    engine({
        extname: ".hbs",
        defaultLayout: join(__dirname, "public/views/layouts/main.hbs"),
        layoputsDir: join(__dirname, "public/views/layouts/"),
        partialsDir: join(__dirname, "public/views/partials")
    })
);

app.set("view engine", "hbs");
app.set("views", join(__dirname, "/public/views"))

app.use(json());
app.use(urlencoded({extended: true}));

app.use("/", router1);

const expressServer = app.listen(8000, () => {
        console.log("listening on port 8000")
    });

const io = new IOServer(expressServer);

io.on("connection", (socket) => {
    console.log(`New connection, socket ID: ${socket.id}`);

    chatMsgs.readMsg()
        .then ((data) => socket.emit("server:message", data))

    cont1.getAll()
        .then((data) => socket.emit("server:product", data))


    socket.on("client:message", (messageInfo) => {
        chatMsgs.saveMsg(messageInfo)
            .then(()=> chatMsgs.readMsg()
                    .then ((data) => io.emit("server:message", data))
            )
    });

    socket.on("client:product", (prodInfo) => {
        cont1.save(prodInfo)
            .then (() => cont1.getAll()
                .then ((data) => io.emit("server:product", data))
            
            )
    })


});

app.on("error", (err) => {console.log(err)});