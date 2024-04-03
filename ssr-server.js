const express = require("express");
const next = require("next");
require("dotenv").config();
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.static(".next"));
    server.get("*", (req, res) => {
      return handle(req, res);
    });
    server.post("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(process.env.PORT, (err) => {
      if (err) throw err;
      console.log("> Ready on https://localhost:" + process.env.PORT);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
