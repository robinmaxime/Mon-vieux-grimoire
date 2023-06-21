const sharp = require("sharp");

function removeExtension(filename) {
    return filename.substring(0, filename.lastIndexOf('.')) || filename;
}

module.exports = async (req, res, next) => {
    // Vérifie que le multer a bien renvoyé un fichier
    if (req.file) {
        const { buffer, originalname } = req.file;
        // Remplace les espaces par des _ et enlève les caractères accentués
        const normalizedName = originalname.replace(/\s|\(|\)/g, "_").normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        // Construit le nom de fichier de destination
        const newFileName = removeExtension(normalizedName) + Date.now() + '.webp';
        // Appel à la bibliothèque Sharp pour retraiter les images
        await sharp(buffer)
        .resize({
            // Redimenssione l'image 1000px max
            height: 1000,
            // Si hauteur - de 1000 : ne redimensionne pas
            withoutEnlargement: true
        }) 
        .webp({ quality: 20 }) // definit le format WEBP avec une qualité à 20
        .toFile("images/" + newFileName) // Definit l'endroit où sera stocké l'image
        // Enregistre l'URL externe dans une nouvelle clef externalURL
        // protocol: http ou https
        // host : ex: localhost ou www.test.com (y compris le port)
        req.file.externalURL = `${req.protocol}://${req.get('host')}/images/${newFileName}`;
    }
    next();
};