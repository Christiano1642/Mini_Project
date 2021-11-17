import express from "express";
import config from "./config.js";
import router from "./router.js";

const app = express();

app.get("/", (_, res) => {
    res.send("Hello Express!");
});

app.use("/api", router);

app.listen(config.port, () =>{
    console.info(`Server running: http://localhost:${config.port}`);
});