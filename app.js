const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./routes/bookRouter");


const app = express();

// Connexion à la base de donnée MongoDB
mongoose.connect('mongodb+srv://robinmaxime44:nyxgex-goJno4-wofhew@cluster0.8ya4put.mongodb.net/monvieuxgrimoire?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Autorise les requêtes Cross Origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Indique les routes à utiliser pour un point End Point
app.use("/api/books", bookRouter);

module.exports = app;