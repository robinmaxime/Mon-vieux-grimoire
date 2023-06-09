const express = require("express");
const bookRouter = require("./routes/bookRouter");

const app = express();

// Autorise les reqêtes Cross Origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use("/api/books", bookRouter);

module.exports = app;