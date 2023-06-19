const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = (req, res, next) => {
    // Hashe le mot de passe en 10 tours
    bcrypt.hash(req.body.password, 10)
    .then((passwordHashed) => {
        // Crée une instance de User avec le mot de passe hashé
        const user = new User({
            email: req.body.email,
            password: passwordHashed
        })
        // Enregistre l'instance dans la BDD
        user.save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }))
}

exports.login = (req, res, next) => {
    // Cherche l'utilisateur par son adresse email
    User.findOne({ email: req.body.email })
    .then((user) => {
        // compare le mot de passe entrée avec la version hashé
        bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
            if (valid) {
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'mimglj7564569853214MJPhvjgf6546843',
                        { expiresIn: '24h' }
                    ) })
            }
            else {
                res.status(401).json({ message: "Paire identifiant/mot de passe non valide" })
            }
        })
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(404).json({ error }));
}