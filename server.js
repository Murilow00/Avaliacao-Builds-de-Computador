import express from "express";
import dotenv from "dotenv";
import pcsRoutes from "./src/routes/pcsRoutes.js";

const app = express()
app.use(express.json());

dotenv.config()
const serverPort = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("servidor em pé VAMOOOOOO")
})


app.use("/computador", pcsRoutes)


app.listen(serverPort, () => {
    console.log(`Servidor funcionando em http://localhost:${serverPort}`)
});