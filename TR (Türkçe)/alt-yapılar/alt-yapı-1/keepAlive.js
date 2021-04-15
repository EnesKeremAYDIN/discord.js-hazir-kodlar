const express = require("express");
const app = express();
const fetch = require("node-fetch");
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  fetch(`http://BOTUN_SUNUCUSUNUN_ALAN_ADI_VE_UZANTISI/`);
}, 1000 * 60 * 3);
