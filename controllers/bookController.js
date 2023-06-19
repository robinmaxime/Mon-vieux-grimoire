const fs = require("fs");

const Book = require("../models/book");

exports.getAllBooks = (req, res, next) => {
    Book.find()
    .then(books => res.status(200).json( books ))
    .catch(error => res.status(400).json({ error }));
};

exports.getBestRating = (req, res, next) => {
    res.status(200).json({ message: "API BEST RATING" });
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json( book ))
    .catch(error => res.status(404).json({ error }));
};

exports.createNewBook = (req, res, next) => {
    // Transforme au format JS le contenu de la clef "book"
    const bookObject = JSON.parse(req.body.book);
    // Suppression du userId pour utiliser le userId du Token à la place
    delete bookObject.userId;
    const book = new Book({
        ...bookObject,
        // On rajoute le userId issus du Token
        userId: req.auth.userId,
        // Ajout de l'url de l'image
        imageUrl: req.file.externalURL
    });
    book.save()
    .then(() => res.status(201).json({ message: "livre créé" }))
    .catch(error => res.status(400).json({ error }))
};

exports.setBookRating = (req, res, next) => {
    res.status(200).json({ message: `API SET BOOK RATING ${req.params.id}` })
};

exports.modifyBook = (req, res, next) => {


    // récupère les données à mettre à jour (soit dans le req.body.book Parsé [si il y a un file] soit dans le req.body)
    const bookUpdated = req.body.book ? JSON.parse(req.body.book) : req.body;
    
    // Ajoute une imageUrl si une file est fourni par le multer
    if (req.file) {
        bookUpdated.imageUrl = req.file.externalURL;
    }

    // Vérifie que le userId associé au token est le même que celui de la requête
    if (bookUpdated.userId === req.auth.userId) {
    // Cherche un livre par son ID pour supprimer l'anciene image associé
        Book.findOne({_id: req.params.id})
        .then((book) => {
            const fileName = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${fileName}`, () => {
                // Met à jour le livre dans la BDD
                Book.updateOne({_id: req.params.id}, {...bookUpdated})
                .then(() => res.status(200).json({ message: "livre modifié" }))
                .catch(error => res.status(400).json({ error }))
            })
        })
        .catch(error => res.status(400).json({ error }));

    } else {
        res.status(403).json({ message: "modification non autorisé"})
    }

};

exports.deleteBook = (req, res, next) => {
    // Cherche le livre dans la BDD
    Book.findOne({_id: req.params.id})
    .then((book) => {
        // Conserve uniquement le nom du fichier
        const filename = book.imageUrl.split('/images/')[1];
        // Supprime de manière asynchrone l'image du disque dur
        fs.unlink(`images/${filename}`, (err) => {
            if (err) {
                res.status(400).json({ message: "suppression impossible du fichier" })
            } else {
                // Supprime le livre de la BDD
                Book.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({ message: "Livre supprimé" }))
                .catch(error => res.status(400).json({ error }))
            }
        });
    } )
    .catch(error => res.status(404).json({ error }))

};

