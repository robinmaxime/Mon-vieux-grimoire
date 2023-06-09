exports.getAllBooks = (req, res, next) => {
    res.status(200).json({ message: "API ALL BOOKS" });
};

exports.getBestRating = (req, res, next) => {
    res.status(200).json({ message: "API BEST RATING" });
};

exports.getOneBook = (req, res, next) => {
    res.status(200).json({ message: `API ONE BOOK ${req.params.id}` });
};

exports.createNewBook = (req, res, next) => {
    res.status(200).json({ message: "API NEW BOOK"})
};

exports.setBookRating = (req, res, next) => {
    res.status(200).json({ message: `API SET BOOK RATING ${req.params.id}` })
};

exports.modifyBook = (req, res, next) => {
    res.status(200).json({ message: `API MODIFY BOOK ${req.params.id}` })
};

exports.deleteBook = (req, res, next) => {
    res.status(200).json({ message: `API DELETE BOOK ${req.params.id}` })
};

